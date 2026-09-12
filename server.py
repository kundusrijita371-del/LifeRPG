#!/usr/bin/env python3
"""
LIFE RPG — Backend Server with AI Questmaster (Gemini API) & SQLite Database
"""

import http.server
import json
import os
import sqlite3
import sys
import urllib.request
import urllib.error
import urllib.parse
from datetime import datetime
import mimetypes

PORT = 8080
DB_FILE = os.path.join(os.path.dirname(__file__), "liferpg.db")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# ═══════════════════════════════════════════════════════════════
# DATABASE INITIALIZATION
# ═══════════════════════════════════════════════════════════════

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Table: Objectives (High-level goals submitted by user)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS objectives (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'player_1',
        title TEXT NOT NULL,
        summary TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Table: Quests (Sub-quests generated or created)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quests (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'player_1',
        objective_id TEXT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL DEFAULT 'pending',
        difficulty TEXT NOT NULL DEFAULT 'Medium',
        xp_reward INTEGER NOT NULL DEFAULT 20,
        gold_reward INTEGER NOT NULL DEFAULT 10,
        completed INTEGER DEFAULT 0,
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (objective_id) REFERENCES objectives(id)
    )
    """)
    
    conn.commit()
    conn.close()
    print(f"📦 [LIFE RPG] SQLite Database initialized at: {DB_FILE}")

init_db()

# ═══════════════════════════════════════════════════════════════
# GEMINI API INTEGRATION & QUEST GENERATION
# ═══════════════════════════════════════════════════════════════

def generate_quests_with_gemini(objective, api_key=""):
    """
    Communicates with Gemini API with structured JSON output enforcement.
    """
    key = api_key or GEMINI_API_KEY
    
    # Structured Prompt
    system_instruction = (
        "You are the Grand AI Questmaster of an epic Life RPG. "
        "Your duty is to decompose high-level real-world objectives into 3 to 6 actionable, "
        "structured RPG sub-quests. Each sub-quest must have calculated XP rewards (10-100) and Gold rewards (5-50) "
        "proportional to the difficulty level (Easy, Medium, Hard, Epic). "
        "Assign appropriate categories: 'pending' (immediate daily tasks/first steps) or 'upcoming' (milestones/later steps). "
        "Make the quest titles inspiring and RPG-flavored while keeping the descriptions clear and practical."
    )
    
    prompt_text = f"Break down this real-world objective into structured RPG quests: \"{objective}\""
    
    # If API key is available, call Google Gemini REST endpoint
    if key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"{system_instruction}\n\nObjective: {prompt_text}"}]
                    }
                ],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "objective": {"type": "STRING"},
                            "summary": {"type": "STRING"},
                            "quests": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "title": {"type": "STRING"},
                                        "description": {"type": "STRING"},
                                        "category": {"type": "STRING", "enum": ["pending", "upcoming"]},
                                        "difficulty": {"type": "STRING", "enum": ["Easy", "Medium", "Hard", "Epic"]},
                                        "xp_reward": {"type": "INTEGER"},
                                        "gold_reward": {"type": "INTEGER"}
                                    },
                                    "required": ["title", "description", "category", "difficulty", "xp_reward", "gold_reward"]
                                }
                            }
                        },
                        "required": ["objective", "summary", "quests"]
                    }
                }
            }
            
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            
            with urllib.request.urlopen(req, timeout=15) as response:
                result = json.loads(response.read().decode('utf-8'))
                text_content = result['candidates'][0]['content']['parts'][0]['text']
                parsed_data = json.loads(text_content)
                return parsed_data
        except Exception as e:
            print(f"⚠️ Gemini API Call failed: {e}. Falling back to dynamic procedural generator.")
    
    # Procedural / Fallback Generator (Produces high quality tailored quests if offline/no key)
    return fallback_quest_generator(objective)


def fallback_quest_generator(objective):
    """
    Intelligent dynamic RPG quest generator fallback.
    Analyzes the objective text keywords and crafts 4-5 thematic quests with scaled XP/Gold.
    """
    obj_lower = objective.lower()
    quests = []
    
    # Detect domain keywords
    if any(k in obj_lower for k in ["code", "program", "app", "web", "react", "python", "software", "dev", "build"]):
        quests = [
            {
                "title": "📜 Blueprint & Architecture Design",
                "description": "Outline core features, schema, and API contracts for your project.",
                "category": "pending",
                "difficulty": "Easy",
                "xp_reward": 15,
                "gold_reward": 8
            },
            {
                "title": "⚔️ Forge the Core Engine",
                "description": "Implement MVP logic, primary routes, and essential UI components.",
                "category": "pending",
                "difficulty": "Hard",
                "xp_reward": 45,
                "gold_reward": 25
            },
            {
                "title": "🛡️ The Trial of Unit Tests & Refactoring",
                "description": "Debug edge cases, optimize performance, and write verification tests.",
                "category": "upcoming",
                "difficulty": "Medium",
                "xp_reward": 30,
                "gold_reward": 15
            },
            {
                "title": "🚀 Kingdom Deployment & Launch",
                "description": "Deploy to production, configure custom domain, and publish live release.",
                "category": "upcoming",
                "difficulty": "Epic",
                "xp_reward": 80,
                "gold_reward": 40
            }
        ]
    elif any(k in obj_lower for k in ["run", "fitness", "gym", "marathon", "workout", "muscle", "health", "diet"]):
        quests = [
            {
                "title": "👟 Gear Up & Route Reconnaissance",
                "description": "Prepare gear, track baseline metrics, and map your training route.",
                "category": "pending",
                "difficulty": "Easy",
                "xp_reward": 10,
                "gold_reward": 5
            },
            {
                "title": "⚡ Interval Sprint Mastery",
                "description": "Complete 3 sets of high-intensity intervals to boost cardiovascular stamina.",
                "category": "pending",
                "difficulty": "Medium",
                "xp_reward": 25,
                "gold_reward": 12
            },
            {
                "title": "🛡️ The 5-Mile Endurance Gauntlet",
                "description": "Execute a steady-state long distance pacing session without stopping.",
                "category": "upcoming",
                "difficulty": "Hard",
                "xp_reward": 50,
                "gold_reward": 25
            },
            {
                "title": "🏆 Final Victory: Race Day Conquest",
                "description": "Cross the finish line and record your personal best record!",
                "category": "upcoming",
                "difficulty": "Epic",
                "xp_reward": 90,
                "gold_reward": 50
            }
        ]
    elif any(k in obj_lower for k in ["book", "read", "study", "learn", "exam", "course", "ai", "language"]):
        quests = [
            {
                "title": "📖 Lore Gathering: Chapter 1-3 Deep Dive",
                "description": "Absorb foundational chapters and take active synthesis notes.",
                "category": "pending",
                "difficulty": "Easy",
                "xp_reward": 15,
                "gold_reward": 8
            },
            {
                "title": "🧠 Mind Palace Flashcard Sparring",
                "description": "Test yourself on 25 key concepts using spaced repetition.",
                "category": "pending",
                "difficulty": "Medium",
                "xp_reward": 25,
                "gold_reward": 12
            },
            {
                "title": "✍️ Scholar's Manuscript Summary",
                "description": "Write a 1-page summary explaining concepts in simple layman terms.",
                "category": "upcoming",
                "difficulty": "Medium",
                "xp_reward": 35,
                "gold_reward": 18
            },
            {
                "title": "🎓 Grand Mastery Examination",
                "description": "Complete the final capstone project or comprehensive mock exam.",
                "category": "upcoming",
                "difficulty": "Epic",
                "xp_reward": 75,
                "gold_reward": 35
            }
        ]
    else:
        clean_title = objective.strip().capitalize()
        quests = [
            {
                "title": f"🗺️ Scout & Plan: {clean_title[:30]}",
                "description": f"Gather resources, set timeline, and break down initial steps for '{objective}'.",
                "category": "pending",
                "difficulty": "Easy",
                "xp_reward": 15,
                "gold_reward": 10
            },
            {
                "title": f"⚔️ Phase 1 Execution: First Milestone",
                "description": f"Complete the first dedicated 90-minute focus block on '{objective}'.",
                "category": "pending",
                "difficulty": "Medium",
                "xp_reward": 30,
                "gold_reward": 15
            },
            {
                "title": f"🛡️ Overcome the Mid-Goal Hurdle",
                "description": f"Review progress, resolve blockers, and lock in the 50% completion mark.",
                "category": "upcoming",
                "difficulty": "Hard",
                "xp_reward": 50,
                "gold_reward": 25
            },
            {
                "title": f"👑 Epic Finish: Conquer {clean_title[:30]}",
                "description": f"Deliver final output, celebrate victory, and claim master rewards for '{objective}'!",
                "category": "upcoming",
                "difficulty": "Epic",
                "xp_reward": 85,
                "gold_reward": 45
            }
        ]
        
    return {
        "objective": objective,
        "summary": f"The Questmaster has decomposed '{objective}' into {len(quests)} strategic milestones.",
        "quests": quests
    }


# ═══════════════════════════════════════════════════════════════
# HTTP REQUEST HANDLER
# ═══════════════════════════════════════════════════════════════

class LifeRPGHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Gemini-Key')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # 1. Endpoint: /api/questmaster/summon
        if self.path.startswith('/api/questmaster/summon'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                body = json.loads(post_data.decode('utf-8'))
                objective = body.get('objective', '').strip()
                custom_key = body.get('apiKey', '') or self.headers.get('X-Gemini-Key', '')
                
                if not objective:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Objective is required"}).encode('utf-8'))
                    return
                
                result = generate_quests_with_gemini(objective, api_key=custom_key)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode('utf-8'))
            except Exception as err:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(err)}).encode('utf-8'))
            return

        # 2. Endpoint: /api/quests (Database Insertion Logic)
        elif self.path.startswith('/api/quests'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                body = json.loads(post_data.decode('utf-8'))
                quests_to_insert = body.get('quests', [])
                objective_title = body.get('objective', 'Custom Objective')
                user_id = body.get('userId', 'player_1')
                
                if not isinstance(quests_to_insert, list):
                    quests_to_insert = [quests_to_insert]
                
                conn = get_db_connection()
                cursor = conn.cursor()
                
                obj_id = f"obj_{int(datetime.now().timestamp()*1000)}"
                cursor.execute(
                    "INSERT INTO objectives (id, user_id, title, summary) VALUES (?, ?, ?, ?)",
                    (obj_id, user_id, objective_title, body.get('summary', ''))
                )
                
                inserted_quests = []
                for q in quests_to_insert:
                    quest_id = f"quest_{int(datetime.now().timestamp()*1000)}_{len(inserted_quests)}"
                    title = q.get('title', 'Untitled Quest')
                    description = q.get('description', '')
                    category = q.get('category', 'pending')
                    difficulty = q.get('difficulty', 'Medium')
                    xp_reward = int(q.get('xp_reward', 20))
                    gold_reward = int(q.get('gold_reward', 10))
                    
                    cursor.execute("""
                        INSERT INTO quests (id, user_id, objective_id, title, description, category, difficulty, xp_reward, gold_reward, completed)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
                    """, (quest_id, user_id, obj_id, title, description, category, difficulty, xp_reward, gold_reward))
                    
                    inserted_quests.append({
                        "id": quest_id,
                        "title": title,
                        "description": description,
                        "category": category,
                        "difficulty": difficulty,
                        "xp_reward": xp_reward,
                        "gold_reward": gold_reward,
                        "completed": False,
                        "objective_id": obj_id
                    })
                
                conn.commit()
                conn.close()
                
                self.send_response(201)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True,
                    "message": f"Successfully forged {len(inserted_quests)} quests into database!",
                    "objectiveId": obj_id,
                    "quests": inserted_quests
                }).encode('utf-8'))
            except Exception as err:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(err)}).encode('utf-8'))
            return

        super().do_POST()

    def do_GET(self):
        # 3. Endpoint: /api/quests (Get all user quests from DB)
        if self.path.startswith('/api/quests'):
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM quests ORDER BY created_at DESC")
                rows = cursor.fetchall()
                quests = [dict(row) for row in rows]
                conn.close()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"quests": quests}).encode('utf-8'))
            except Exception as err:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(err)}).encode('utf-8'))
            return

        super().do_GET()


def run():
    os.chdir(os.path.dirname(__file__))
    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, LifeRPGHandler)
    print(f"🧙‍♂️ [LIFE RPG] Server running on http://localhost:{PORT}/")
    print(f"✨ AI Questmaster Endpoint: POST http://localhost:{PORT}/api/questmaster/summon")
    print(f"💾 Quest Database Endpoint: POST http://localhost:{PORT}/api/quests")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
