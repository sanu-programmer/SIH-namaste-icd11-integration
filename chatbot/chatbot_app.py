import streamlit as st
import pandas as pd
from fuzzywuzzy import process

# Load CSV
df = pd.read_csv("ayurveda_icd_mapping.csv")

# Function for matching input
def get_icd_mapping(user_input):
    search_terms = []
    term_to_row = {}
    
    for _, row in df.iterrows():
        terms = [row['ayurveda_desc']]
        if pd.notna(row.get('keywords')):
            terms += [t.strip() for t in row['keywords'].split(',')]
        for t in terms:
            search_terms.append(t)
            term_to_row[t] = row
    
    match, score = process.extractOne(user_input, search_terms)
    
    if score > 60:
        row = term_to_row[match]
        return (
            f"Input matched: {match}\n\n"
            f"🌿 Namaste Mapping → {row['ayurveda_code']} - {row['ayurveda_desc']}\n"
            f"🩺 ICD-11 Mapping → {row['icd11_code']} - {row['icd11_desc']}"
        )
    else:
        return "Sorry, no close match found in the database."

# Streamlit UI
st.set_page_config(page_title="Dual-Diagnosis Chatbot", page_icon="🩺")
st.title("💬 Ved - Your Ayurveda Chatbot")
st.write("Hi, I’m Ved. Ask me anything about Ayurveda or diseases, and I’ll map it to ICD-11.")

# Initialize chat history
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Input box with submit button
with st.form("chat_form", clear_on_submit=True):
    user_input = st.text_input("You:", key="user_input")
    submitted = st.form_submit_button("Send")

if submitted and user_input:
    response = get_icd_mapping(user_input)
    st.session_state.chat_history.append({"user": user_input, "bot": response})

# Display chat history
for chat in st.session_state.chat_history:
    st.markdown(f"**You:** {chat['user']}")
    st.markdown(f"**Ved:** {chat['bot']}")

