import streamlit as st

st.title("🔍 AI Waste Scanner")
st.write("Take a photo of your industrial scrap, and our GenAI will classify it.")

uploaded_file = st.file_uploader("Upload Image", type=['jpg', 'png', 'jpeg'])

if uploaded_file is not None:
    st.image(uploaded_file, caption='Uploaded Scrap', use_column_width=True)
    with st.spinner('AI analyzing material properties...'):
        # This is where your AI logic will eventually go
        st.success("Analysis Complete!")
        st.info("Detected: High-Density Polyethylene (HDPE) | Estimated Value: ₹45/kg")