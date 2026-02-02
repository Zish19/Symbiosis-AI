import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv
from PIL import Image
import plotly.graph_objects as go
import random
import io
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from streamlit_mic_recorder import speech_to_text # <--- NEW VOICE LIBRARY

# --- CONFIGURATION ---
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    st.error("CRITICAL ERROR: GOOGLE_API_KEY not found.")
    st.stop()

genai.configure(api_key=api_key)

st.set_page_config(
    page_title="Symbiosis AI",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- HELPER: PDF CERTIFICATE GENERATOR ---
# --- HELPER: PDF CERTIFICATE GENERATOR ---
def create_pdf_certificate(item_name, material_type, value, process):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    # Border & Header
    # FIX: Use HexColor instead of hexof
    c.setStrokeColor(colors.HexColor("#00d2ff")) 
    c.setLineWidth(5)
    c.rect(30, 30, width-60, height-60)
    
    c.setFont("Helvetica-Bold", 30)
    c.drawCentredString(width/2, height-100, "SYMBIOSIS RECYCLING CERTIFICATE")
    
    c.setFont("Helvetica", 12)
    c.drawCentredString(width/2, height-130, "Verified by AI Audit System v2.6")
    
    # Content
    c.setFont("Helvetica", 16)
    c.drawString(100, height-250, f"Date: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    c.drawString(100, height-300, f"Identified Item: {item_name}")
    c.drawString(100, height-340, f"Material Classification: {material_type}")
    c.drawString(100, height-380, f"Estimated Market Value: {value}")
    
    c.setFont("Helvetica-Oblique", 14)
    c.drawString(100, height-450, "Recommended Process:")
    c.drawString(100, height-470, process[:80] + "...") # Truncate for PDF
    
    # Footer
    c.setFont("Helvetica-Bold", 20)
    # FIX: Use HexColor instead of hexof
    c.setFillColor(colors.HexColor("#00d2ff"))
    c.drawCentredString(width/2, 100, "APPROVED FOR PROCESSING")
    
    c.save()
    buffer.seek(0)
    return buffer

# --- 100+ SAMPLE GENERATOR ---
def generate_market_data():
    data = []
    materials = [
        ("Copper Wire (Grade A)", "Metal", 650, 750),
        ("Aluminum Cans", "Metal", 100, 130),
        ("Industrial Steel Scrap", "Metal", 40, 60),
        ("Lithium Ion Batteries", "E-Waste", 800, 1200),
        ("PCB Motherboards", "E-Waste", 3000, 5000),
        ("HDPE Plastic Pellets", "Plastic", 80, 100),
        ("PET Bottle Bales", "Plastic", 30, 50),
        ("Glass Cullet (Mixed)", "Glass", 5, 15),
        ("Rubber Tires (Shredded)", "Rubber", 15, 25),
        ("Textile Offcuts", "Textile", 20, 40)
    ]
    sellers = ["EcoTech India", "GreenCycle Ltd", "Factory A", "Factory B", "Urban Miners", "ScrapKing", "RecycleOne"]
    units = ["kg", "tons", "units"]
    trends = ["up", "down", "stable"]

    for i in range(100):
        mat, cat, min_p, max_p = random.choice(materials)
        data.append({
            "id": i + 1,
            "item": mat,
            "qty": random.randint(50, 5000),
            "unit": random.choice(units),
            "price": random.randint(min_p, max_p),
            "seller": random.choice(sellers),
            "type": cat,
            "trend": random.choice(trends)
        })
    return data

# --- INITIALIZE STATE ---
if "listings" not in st.session_state:
    st.session_state.listings = generate_market_data()

if "chat_history" not in st.session_state:
    st.session_state.chat_history = [
        {"role": "model", "text": "Hello, COO. I have analyzed your inventory. We are currently heavy on E-Waste. How can I assist?"}
    ]

# --- STYLING ---
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');
    html, body, [class*="css"] { font-family: 'Inter', sans-serif; background-color: #050505; color: #e0e0e0; }
    
    /* CHAT STYLES */
    .stChatMessage { background: #111; border: 1px solid #333; border-radius: 10px; }
    .stChatMessage[data-testid="user-message"] { background: #00d2ff10; border-color: #00d2ff; }
    
    /* SIDEBAR */
    [data-testid="stSidebar"] { background-color: #0a0a0a; border-right: 1px solid #222; }
    
    /* BUTTONS */
    .stButton>button { background: #00d2ff; color: #000; border: none; font-weight: 600; transition: opacity 0.2s; }
    .stButton>button:hover { opacity: 0.8; }
    
    /* VOICE ANIMATION */
    .voice-active { animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0, 210, 255, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(0, 210, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 210, 255, 0); } }
    </style>
""", unsafe_allow_html=True)

# --- SIDEBAR ---
with st.sidebar:
    st.markdown("### SYMBIOSIS AI")
    st.caption("Industrial Waste OS v3.0 (Voice Enabled)")
    st.markdown("---")
    menu = st.radio("NAVIGATION", ["DASHBOARD", "AI AUDITOR", "MARKETPLACE", "SMART ASSISTANT", "SETTINGS"], label_visibility="collapsed")
    st.markdown("---")
    st.markdown("<div style='font-size:0.8rem; color:#666;'>🟢 SYSTEM OPERATIONAL</div>", unsafe_allow_html=True)

# --- 1. DASHBOARD ---
if menu == "DASHBOARD":
    st.title("Operational Overview")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Waste Recycled", "4,250 kg", "+12%")
    c2.metric("Revenue", "INR 85,400", "+24%")
    c3.metric("CO2 Offset", "1.2 Tons", "+8%")
    c4.metric("Audit Score", "98/100", "Elite")
    
    st.markdown("<br>### Performance Analytics", unsafe_allow_html=True)
    fig = go.Figure(data=[go.Scatter(y=[10, 15, 13, 17, 22, 19, 25], mode='lines', fill='tozeroy', line=dict(color='#00d2ff', width=2))])
    fig.update_layout(plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='#666'), margin=dict(l=0,r=0,t=20,b=20), height=300)
    st.plotly_chart(fig, use_container_width=True)

# --- 2. AI AUDITOR (WITH PDF) ---
elif menu == "AI AUDITOR":
    st.title("Neural Waste Scanner")
    c1, c2 = st.columns([1, 1])
    with c1:
        st.markdown("### 1. Upload Image")
        uploaded_file = st.file_uploader("Drop scrap image here", type=["jpg", "png", "jpeg"], label_visibility="collapsed")
        if uploaded_file:
            image = Image.open(uploaded_file)
            st.image(image, caption="Analysis Target", use_container_width=True)
    
    with c2:
        st.markdown("### 2. Analysis Results")
        if uploaded_file and st.button("RUN DIAGNOSTICS"):
            with st.spinner("Scanning with Gemini 2.5..."):
                try:
                    # 1. AI Analysis
                    model = genai.GenerativeModel("gemini-2.5-flash")
                    prompt = "Analyze this industrial waste. Return 4 lines ONLY: ITEM, MATERIAL, VALUE (e.g. INR 500/kg), PROCESS"
                    response = model.generate_content([prompt, image])
                    result_text = response.text
                    
                    # Parse results for PDF (Simple parsing)
                    lines = result_text.split('\n')
                    item_val = lines[0].split(':')[-1] if len(lines) > 0 else "Unknown"
                    mat_val = lines[1].split(':')[-1] if len(lines) > 1 else "Unknown"
                    val_val = lines[2].split(':')[-1] if len(lines) > 2 else "Unknown"
                    proc_val = lines[3].split(':')[-1] if len(lines) > 3 else "Unknown"

                    # 2. Display Result
                    st.success("SCAN COMPLETE")
                    st.markdown(f"<div style='background:#111; padding:20px; border-left:3px solid #00d2ff; color:#00d2ff; font-family:monospace;'>{result_text.replace(chr(10), '<br>')}</div>", unsafe_allow_html=True)
                    
                    # 3. Generate PDF
                    pdf_bytes = create_pdf_certificate(item_val, mat_val, val_val, proc_val)
                    st.markdown("<br>", unsafe_allow_html=True)
                    st.download_button(
                        label="📄 DOWNLOAD OFFICIAL CERTIFICATE",
                        data=pdf_bytes,
                        file_name="recycling_certificate.pdf",
                        mime="application/pdf"
                    )
                    
                except Exception as e:
                    st.error(f"Error: {e}")

# --- 3. MARKETPLACE ---
elif menu == "MARKETPLACE":
    st.title("B2B Material Exchange")
    st.markdown("<div style='background:#111; padding:10px; color:#888; font-family:monospace; margin-bottom:20px;'>MARKET PULSE: <span style='color:#00ff88;'>COPPER ▲ +2.4%</span> <span style='color:#ff4444;'>ALUMINUM ▼ -0.8%</span></div>", unsafe_allow_html=True)
    
    tabs = st.tabs(["BROWSE", "ANALYTICS", "SELL"])
    
    with tabs[0]: # Browse
        c1, c2 = st.columns([3, 1])
        search = c1.text_input("Search inventory...", placeholder="e.g. Copper")
        filter_type = c2.selectbox("Filter", ["All", "Metal", "Plastic", "E-Waste", "Glass", "Rubber", "Textile"])
        
        # Table Header
        st.markdown("<div style='display:grid; grid-template-columns:3fr 2fr 2fr 2fr; padding:10px; color:#666; font-weight:600; border-bottom:1px solid #333;'><div>ITEM</div><div>QTY</div><div>PRICE</div><div>ACTION</div></div>", unsafe_allow_html=True)
        
        count = 0
        for item in st.session_state.listings:
            if count >= 50: break
            if filter_type != "All" and item["type"] != filter_type: continue
            if search and search.lower() not in item["item"].lower(): continue
            count += 1
            
            with st.container():
                c1, c2, c3, c4 = st.columns([3, 2, 2, 2])
                c1.markdown(f"**{item['item']}**<br><span style='color:#666; font-size:0.8rem;'>{item['seller']}</span>", unsafe_allow_html=True)
                c2.markdown(f"{item['qty']} {item['unit']}")
                c3.markdown(f"INR {item['price']}")
                if c4.button("BID", key=f"btn_{item['id']}"): st.toast(f"Bid placed on {item['item']}!", icon="✅")
                st.markdown("<hr style='margin:5px 0; border-color:#222;'>", unsafe_allow_html=True)

    with tabs[1]: # Analytics
        st.markdown("### Price Trends")
        fig = go.Figure(data=[go.Scatter(y=[700, 720, 710, 730], line=dict(color='#00ff88'))])
        fig.update_layout(plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='#888'), height=300)
        st.plotly_chart(fig, use_container_width=True)

    with tabs[2]: # Sell
        st.markdown("### New Listing")
        with st.form("sell_form"):
            new_item = st.text_input("Item Name")
            submitted = st.form_submit_button("PUBLISH")
            if submitted: st.success("Listing Added!")

# --- 4. SMART ASSISTANT (WITH VOICE) ---
elif menu == "SMART ASSISTANT":
    st.title("🤖 Industrial Copilot")
    st.markdown("Ask questions about your inventory or use **Voice Commands** (e.g., 'Add 500kg of Steel').")

    # A. Voice Input Section
    st.markdown("### 🎙️ Voice Command")
    # This widget returns text when speech ends
    voice_text = speech_to_text(language='en', start_prompt="CLICK TO SPEAK", stop_prompt="LISTENING...", just_once=True, key='STT')
    
    # B. Process Voice Command
    if voice_text:
        st.info(f"🎤 Heard: '{voice_text}'")
        
        # Simple Logic to Detect "Add" command
        if "add" in voice_text.lower():
            try:
                # Basic Parsing: "Add 500 kg of Steel"
                parts = voice_text.split(' ')
                # Heuristic: Find number (qty) and the rest is item
                qty = next((int(s) for s in parts if s.isdigit()), 100)
                item_name = voice_text.lower().replace("add", "").replace(str(qty), "").replace("kg", "").replace("of", "").strip().title()
                
                # Execute Action
                new_id = len(st.session_state.listings) + 1
                st.session_state.listings.insert(0, {
                    "id": new_id, "item": item_name, "qty": qty, "unit": "kg", 
                    "price": 0, "seller": "Voice Input", "type": "Mixed", "trend": "stable"
                })
                st.success(f"✅ ACTION EXECUTED: Added {qty}kg of {item_name} to Inventory.")
                
            except:
                st.warning("Could not parse command. Try: 'Add 500 kg of Steel'")
        else:
            # Treat as Chat Input
            st.session_state.chat_history.append({"role": "user", "text": voice_text})

    # C. Chat Interface
    chat_container = st.container()
    with chat_container:
        for msg in st.session_state.chat_history:
            role_display = "user" if msg["role"] == "user" else "assistant"
            with st.chat_message(role_display):
                st.write(msg["text"])

    # D. Text Input (Fallback)
    if prompt := st.chat_input("Type your query..."):
        # Add User Message
        st.session_state.chat_history.append({"role": "user", "text": prompt})
        with st.chat_message("user"):
            st.write(prompt)
            
        # Generate AI Response (Context Aware)
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                # Create context from top 5 listings
                inventory_context = "\n".join([f"- {i['qty']}{i['unit']} of {i['item']} ({i['seller']})" for i in st.session_state.listings[:5]])
                
                full_prompt = f"""
                You are the COO of a recycling facility.
                Current Top Inventory:
                {inventory_context}
                
                User Query: {prompt}
                
                Answer briefly and professionally.
                """
                
                model = genai.GenerativeModel("gemini-2.5-flash")
                response = model.generate_content(full_prompt)
                
                st.write(response.text)
                st.session_state.chat_history.append({"role": "model", "text": response.text})

# --- 5. SETTINGS ---
elif menu == "SETTINGS":
    st.title("System Configuration")
    st.text_input("Wallet Address", value="0x71C...9A23")
    st.checkbox("Enable High-Res Scanning", value=True)
    st.caption("v3.0 Stable")