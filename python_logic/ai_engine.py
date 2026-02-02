cd webimport os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

# Load API Key
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
    # Using the model you confirmed exists in your list
    model = genai.GenerativeModel('gemini-flash-latest')
else:
    model = None
    print("⚠️ WARNING: No API Key found. Using Mock Mode.")

# Database of Buyers
BUYERS_DB = [
    {"name": "GreenRoads Infra", "location": "Sector 24, Faridabad", "needs": ["plastic", "rubber", "polymers", "pet"], "price": 42},
    {"name": "EcoBricks Ltd", "location": "Ballabgarh", "needs": ["fly ash", "sludge", "concrete"], "price": 15},
    {"name": "MetalRecyclers Inc", "location": "Sector 58, Faridabad", "needs": ["copper", "iron", "aluminum", "metal"], "price": 120},
    {"name": "TextileUpcycle Co", "location": "NIT 3, Faridabad", "needs": ["fabric", "cotton", "textile"], "price": 25},
]

def analyze_image(image_bytes):
    if not model:
        print("Model not configured. Check API Key.")
        return _get_mock_data()

    try:
        prompt = """
        You are an expert Industrial Waste Auditor. Analyze this image.
        Return a valid JSON object with these keys:
        {
            "material": "Technical Name",
            "category": "Metal/Plastic/Chemical/etc",
            "confidence": 0.95,
            "hazard_level": "Low/Medium/High",
            "estimated_value_inr": "Price per kg",
            "carbon_saved": "CO2 saved",
            "recycling_process": "1 sentence explanation"
        }
        DO NOT use markdown formatting. Just return the JSON string.
        """
        
        response = model.generate_content([
            {'mime_type': 'image/jpeg', 'data': image_bytes},
            prompt
        ])
        
        print(f"🔹 Raw AI Response: {response.text}") # Debugging: See what AI actually said

        # ROBUST FIX: Use Regex to find the JSON object { ... } inside the text
        # This works even if the AI says "Here is your data: {json} ..."
        json_match = re.search(r"\{.*\}", response.text, re.DOTALL)
        
        if json_match:
            clean_json = json_match.group(0)
            return json.loads(clean_json)
        else:
            raise ValueError("No JSON found in AI response")

    except Exception as e:
        print(f"❌ AI CRITICAL ERROR: {e}")
        return _get_mock_data()

def match_buyer(material_info):
    material_name = material_info.get("material", "").lower()
    category = material_info.get("category", "").lower()
    matches = []
    
    for buyer in BUYERS_DB:
        buyer_needs = [n.lower() for n in buyer["needs"]]
        score = 0
        if any(need in material_name for need in buyer_needs):
            score += 50
        if any(need in category for need in buyer_needs):
            score += 30
            
        if score > 0:
            matches.append({**buyer, "match_score": score + 20})
    
    matches.sort(key=lambda x: x["match_score"], reverse=True)
    if not matches:
        matches.append(BUYERS_DB[0])
    return matches

def _get_mock_data():
    return {
        "material": "Unknown Scrap (Mock Mode)",
        "category": "General Waste",
        "confidence": 0.0,
        "hazard_level": "Unknown",
        "estimated_value_inr": "10",
        "carbon_saved": "Unknown",
        "recycling_process": "Manual sorting required."
    }