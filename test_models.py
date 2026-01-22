import google.generativeai as genai
import os

# REPLACE WITH YOUR ACTUAL API KEY
api_key = "AIzaSyCvTH6as7Jc2jUL6UeWHU_r2djygtPqr3k" 

genai.configure(api_key=api_key)

print("🔍 Scanning for available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"✅ Found: {m.name}")
except Exception as e:
    print(f"❌ Error: {e}")