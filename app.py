import streamlit as st
import pandas as pd

# 1. PAGE CONFIG (The "Chakachak" Setup)
st.set_page_config(page_title="Circular Bharat Dashboard", layout="wide", initial_sidebar_state="expanded")

# 2. CUSTOM CSS (The Glassmorphism & Fintech Styling)
st.markdown("""
    <style>
    /* Global Background */
    .stApp {
        background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        color: #ffffff;
    }
    
    /* Sidebar Styling */
    section[data-testid="stSidebar"] {
        background: rgba(255, 255, 255, 0.05) !important;
        backdrop-filter: blur(10px);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Glassmorphism Metric Cards */
    [data-testid="stMetricValue"] {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }

    /* AI Verification Badge */
    .ai-badge {
        background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
        color: #000;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
    }

    /* Smart Contract Button Styling */
    div.stButton > button:first-child {
        background-color: #4CAF50;
        color: white;
        border-radius: 10px;
        border: none;
        padding: 10px 24px;
        transition: 0.3s;
    }
    div.stButton > button:hover {
        background-color: #45a049;
        box-shadow: 0 0 15px #4CAF50;
        transform: scale(1.05);
    }
    </style>
    """, unsafe_allow_html=True)

# 3. SIDEBAR NAVIGATION
with st.sidebar:
    st.title("♻️ Circular Bharat")
    st.markdown("---")
    nav = st.radio("Navigation", ["Dashboard", "Marketplace", "Reports", "Profile"])
    st.markdown("---")
    st.info("📍 Location: Faridabad Sector 24")

# 4. DASHBOARD PAGE
if nav == "Dashboard":
    st.header("🌟 MSME Green Impact Dashboard")
    
    # Glassmorphism Metrics
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Waste Recycled", "4,250 kg", "+15%")
    col2.metric("CO2 Offset", "1.2 Tons", "+5%")
    col3.metric("Revenue Earned", "₹85,400", "+22%")
    col4.metric("Green Credits", "120 pts", "Gold Tier")
    
    st.divider()
    st.subheader("Recent Impact Trends")
    chart_data = pd.DataFrame({'Month': ['Aug', 'Sep', 'Oct'], 'Recycled': [1200, 2500, 4250]})
    st.line_chart(chart_data.set_index('Month'))

# 5. MARKETPLACE FEED PAGE
elif nav == "Marketplace":
    st.header("📦 Industrial Waste Marketplace")
    st.caption("Live feed of by-products from nearby MSMEs in Faridabad")

    # Mock Marketplace Data
    listings = [
        {"item": "Black Rubber Scraps", "qty": "500kg", "loc": "Sector 24", "type": "Polypropylene"},
        {"item": "Aluminium Shavings", "qty": "2 Tons", "loc": "Okhla Ph-1", "type": "Metal"},
        {"item": "Cotton Textile Scraps", "qty": "120kg", "loc": "NIT Faridabad", "type": "Fabric"}
    ]

    for list_item in listings:
        with st.container():
            c1, c2 = st.columns([3, 1])
            with c1:
                st.markdown(f"### {list_item['item']} <span class='ai-badge'>✨ AI Verified</span>", unsafe_allow_html=True)
                st.write(f"📍 {list_item['loc']} | ⚖️ {list_item['qty']} | 🧪 Type: {list_item['type']}")
            with c2:
                if st.button(f"Buy via Smart Contract", key=list_item['item']):
                    st.toast(f"Initiating Blockchain Transaction for {list_item['item']}...")
                    st.success("Transaction Secured on Polygon Testnet!")
            st.divider()