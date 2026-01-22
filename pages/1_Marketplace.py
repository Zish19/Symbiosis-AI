import streamlit as st

def marketplace():
    st.title("♻️ Bharat Circular Marketplace")
    st.subheader("Live Industrial Waste Listings in Faridabad")
    
    # Mock data (This will eventually come from your Backend/FastAPI)
    listings = [
        {"item": "Black Rubber Scraps", "qty": "500kg", "loc": "Sector 24", "status": "Verified"},
        {"item": "Metal Shavings", "qty": "2 Tons", "loc": "Okhla Industrial Area", "status": "Pending"},
    ]

    for post in listings:
        with st.container():
            col1, col2 = st.columns([3, 1])
            col1.write(f"### {post['item']}")
            col1.write(f"📍 {post['loc']} | ⚖️ {post['qty']}")
            if col2.button("Claim Material", key=post['item']):
                st.success(f"Claimed {post['item']}! Smart Contract Initiated.")
            st.divider()

marketplace()