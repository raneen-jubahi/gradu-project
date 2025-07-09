# A Graduation Project by Raneen Jubahi
Detecting Broken Plural Words Using AI Model on master branch 
# 📚 Arabic Plural Classification Using Artificial Intelligence
  
> Focused on the detection and classification of Arabic broken and sound plurals using AI.
---
## 📌 Project Overview
Arabic broken plurals are among the most complex phenomena in Arabic morphology due to their irregular, non-concatenative structure. This project introduces an intelligent system for **classifying Arabic plural types** at both **word** and **sentence** levels using machine learning and linguistic analysis.

The system supports:
- **Broken Plurals**
- **Sound Masculine Plurals**
- **Sound Feminine Plurals**
---
## 🚀 Features
- ✅ Character-level TF-IDF with **Random Forest** (F1-score: 0.9976)
- ✅ Sentence-level classifier using **SVM + Stanza POS Tagging**
- ✅ Manually curated dataset with:
  - Lemmas
  - Roots
  - Morphological patterns
  - Diacritics
  - English translations
- ✅ Real-time predictions with confidence scores
- ✅ Two web interfaces:
  - **React + Flask** (word-level)
  - **Streamlit** (sentence-level)
---
## 🧠 Dataset
- Total entries: **1,701**
- Labels:
  - `Broken`
  - `Sound Masculine`
  - `Sound Feminine`
- Format: CSV with additional linguistic annotations
---
## 🧰 Tech Stack

| Layer         | Technology                              |
|---------------|------------------------------------------|
| Frontend      | React.js                                 |
| Backend       | Flask (Word-level) / Streamlit (Sentence-level) |
| ML Models     | Random Forest, SVM, TF-IDF, Stanza       |
| Language      | Python                                   |
| Dataset Tools | Pandas, Scikit-learn                     |

---

---

## 🛠️ How to Run

### 1. Clone the repo
```bash
git clone https://github.com/raneen-jubahi/gradu-project.git
cd gradu-project
##Setup Flask App
cd flask-app
pip install -r requirements.txt
python app.py
## Setup React App
cd react-app
npm install
npm start
##Run Streamlit App (Sentence-level)
cd streamlit-app
streamlit run app.py
📈 Results
Model	          Accuracy	    F1-Score
Random Forest	   99.82%	       0.9976
SVM (sentence)  	97.43%	      0.9641



