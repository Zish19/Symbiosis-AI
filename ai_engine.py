# ai_engine.py
import random

# Mock database of buyers (The Data Lead will expand this)
BUYERS_DB = [
    {"name": "GreenRoads Infra", "location": "Sector 24, Faridabad", "needs": ["Plastic", "Rubber"], "price": 40},
    {"name": "EcoBricks Ltd", "location": "Ballabgarh", "needs": ["Fly Ash", "Sludge"], "price": 15},
    {"name": "MetalRecyclers Inc", "location": "Sector 58, Faridabad", "needs": ["Metal"], "price": 120},
]

def analyze_image(image_bytes):
    """
    Simulates AI Vision. 
    TODO: Replace with GPT-4o Vision API call later.
    """
    # Randomly picking a result for the demo
    detected_items = [
        {"material": "Plastic - PET", "confidence": 0.98},
        {"material": "Metal - Copper", "confidence": 0.92},
        {"material": "Industrial Sludge", "confidence": 0.85}
    ]
    return random.choice(detected_items)

def match_buyer(material_type):
    """
    Finds a buyer based on the material detected.
    """
    matches = []
    for buyer in BUYERS_DB:
        # Simple string matching for now
        if any(need in material_type for need in buyer["needs"]):
            matches.append(buyer)
    
    # If no exact match, return a generic one for demo
    if not matches:
        matches.append(BUYERS_DB[0])
        
    return matches