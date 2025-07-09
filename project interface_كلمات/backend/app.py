from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

# إعداد التطبيق
app = Flask(__name__)
CORS(app)

# تحميل النموذج والمحول
model = joblib.load("rf_final_model.pkl")
vectorizer = joblib.load("rf_final_vectorizer.pkl")

# تنظيف النص
def clean_word(text):
    text = re.sub(r'[\u064B-\u0652]', '', text)  # إزالة التشكيل
    text = re.sub(r'[أإآ]', 'ا', text)  # توحيد الهمزات
    return text.strip()

@app.route("/api/classify", methods=["POST"])
def classify_words():
    data = request.get_json()
    raw_input = data.get("words", "")

    if isinstance(raw_input, list):
        words = [clean_word(w) for w in raw_input if w.strip()]
    else:
        words = [clean_word(w) for w in raw_input.split(",") if w.strip()]

    if not words:
        return jsonify({"error": "⚠️ لم يتم إدخال كلمات."}), 400

    results = []

    for word in words:
        vec = vectorizer.transform([word])
        label = model.predict(vec)[0]
        confidence = round(model.predict_proba(vec).max() * 100, 2)
        results.append({
            "word": word,
            "label": label,
            "confidence": confidence
        })

    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
