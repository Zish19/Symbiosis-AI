# backend.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ai_engine import analyze_image, match_buyer
import uvicorn

app = FastAPI()

# --- CORS CONFIGURATION (Allows React to talk to Python) ---
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

@app.get("/")
def home():
    return {"status": "Symbiosis AI Server Running"}

@app.post("/predict")
async def predict_waste(file: UploadFile = File(...)):
    try:
        # 1. Read the image file
        image_data = await file.read()
        
        # 2. Get the AI Analysis (Returns a Dictionary)
        # Example: {'material': 'Copper', 'confidence': 0.9, ...}
        analysis = analyze_image(image_data)
        
        # 3. Find Buyers
        # FIX: We now pass the WHOLE analysis dictionary, not just the name
        buyers = match_buyer(analysis)
        
        # 4. Return clean JSON to Frontend
        return {
            "analysis": analysis,
            "recommended_buyers": buyers
        }

    except Exception as e:
        print(f"CRITICAL BACKEND ERROR: {e}")
        return {"error": str(e)}

# Run the server directly
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)