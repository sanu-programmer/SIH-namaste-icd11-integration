from flask import Flask, request, jsonify
import pandas as pd
from fuzzywuzzy import process

app = Flask(__name__)

# Load CSV
df = pd.read_csv("ayurveda_icd_mapping.csv")

# Matching function
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
        return {
            "match": match,
            "icd11_code": row["icd11_code"],
            "icd11_desc": row["icd11_desc"]
        }
    else:
        return {"error": "No close match found."}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    result = get_icd_mapping(user_input)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
