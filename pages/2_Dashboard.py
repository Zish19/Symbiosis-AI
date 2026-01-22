import streamlit as st
import pandas as pd

def stats():
    st.sidebar.title("Factory Profile")
    st.title("🌟 Your Green Impact")
    
    # Big Bold Metrics
    kpi1, kpi2, kpi3 = st.columns(3)
    kpi1.metric("Waste Recycled", "1,200 kg", "+15%")
    kpi2.metric("CO2 Saved", "450 kg", "+10%")
    kpi3.metric("Revenue Earned", "₹45,000", "+22%")

    # Simple Chart
    chart_data = pd.DataFrame({'Month': ['Aug', 'Sep', 'Oct'], 'Recycled': [200, 500, 1200]})
    st.line_chart(chart_data.set_index('Month'))

stats()