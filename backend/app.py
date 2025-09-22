from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from langdetect import detect, DetectorFactory
import re

from models.fee_model import Fee, SessionLocal, init_db
from utils.translator import translate_to_english, translate_from_english

# Make langdetect deterministic
DetectorFactory.seed = 0  

app = FastAPI()

# Enable CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions = {}

def safe_detect(text: str) -> str:
    """Detect language safely with fallback to English."""
    try:
        if len(text.split()) <= 1:  # if input is just 1 word like 'fee', 'general'
            return "en"
        return detect(text)
    except:
        return "en"

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    message = data.get("message", "")

    # Detect language safely
    lang = safe_detect(message)

    # Normalize input → English
    message_en = translate_to_english(message)

    session = sessions.get(user_id, {"stage": "start"})
    response = ""

    db = SessionLocal()

    # Check if message mentions fee
    is_fee = bool(re.search(r"\bfee\b|\bfees\b|\bफीस\b", message_en.lower()))

    # Castes supported
    castes = ["general", "obc", "sc", "st"]
    mentioned_castes = [c for c in castes if c in message_en.lower()]

    if is_fee:
        if "all" in message_en.lower():
            fees = db.query(Fee).all()
            fee_parts = [f"{f.caste.capitalize()} – {f.amount}" for f in fees]
            response = "The fees are: " + ", ".join(fee_parts) + "."
            session["stage"] = "done"
        elif mentioned_castes:
            fees = db.query(Fee).filter(Fee.caste.in_(mentioned_castes)).all()
            fee_parts = [f"{f.caste.capitalize()} – {f.amount}" for f in fees]
            response = "The fees are: " + ", ".join(fee_parts) + "."
            session["stage"] = "done"
        else:
            response = "Please specify your caste (General, OBC, SC, ST)."
            session["stage"] = "ask_caste"
    elif session["stage"] == "ask_caste" and mentioned_castes:
        fees = db.query(Fee).filter(Fee.caste.in_(mentioned_castes)).all()
        fee_parts = [f"{f.caste.capitalize()} – {f.amount}" for f in fees]
        response = "The fees are: " + ", ".join(fee_parts) + "."
        session["stage"] = "done"
    else:
        response = "Sorry, I can only answer fee-related queries for now."

    db.close()
    sessions[user_id] = session

    # Translate response back into user’s language
    response_final = translate_from_english(response, lang)

    return {"response": response_final}
