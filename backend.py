from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ai_engine import analyze_image, match_buyer
import uvicorn

app = FastAPI()

# --- 1. THE CORS GATEKEEPER ---
# We use both localhost and 127.0.0.1 to prevent "Connection Refused"
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
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

# --- 2. THE MAIN ENGINE ---
# 🚨 FIXED: Route name changed to /analyze to match your AIScanner.jsx
@app.post("/analyze") 
async def predict_waste(image: UploadFile = File(...)): # 🚨 Ensure key is 'image'
    try:
        # 1. Read the image file
        image_data = await image.read()
        
        # 2. Get the AI Analysis (Gemini/Vision Logic)
        analysis = analyze_image(image_data)
        
        # 3. Match with Buyers in Faridabad/Delhi
        buyers = match_buyer(analysis)
        
        # 4. Success Response
        return {
            "status": "success",
            "analysis": analysis,
            "recommended_buyers": buyers
        }

    except Exception as e:
        print(f"CRITICAL BACKEND ERROR: {e}")
        # Return a proper 500 error instead of just a string
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)