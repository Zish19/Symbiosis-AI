# backend.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # <--- NEW IMPORT
from ai_engine import analyze_image, match_buyer
import uvicorn

app = FastAPI()

# --- NEW: ALLOW REACT TO CONNECT ---
origins = [
    "http://localhost:5173",  # React default port
    "http://localhost:3000",  # Alternate React port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------

@app.get("/")
def home():
    return {"status": "Symbiosis AI Server Running"}

@app.post("/predict")
async def predict_waste(file: UploadFile = File(...)):
    image_data = await file.read()
    analysis = analyze_image(image_data)
    buyers = match_buyer(analysis["material"])
    return {
        "analysis": analysis,
        "recommended_buyers": buyers
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)