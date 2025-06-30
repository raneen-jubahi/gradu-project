from qalsadi.lemmatizer import Lemmatizer

lemmatizer = Lemmatizer()

words = [
    "مهندسة", "كتاب", "فكرة", "مدرسة", "باب", "ولد", "بيت", "مدينة", "طالب",
    "كتب", "مدارس", "أقلام", "زهور", "طلاب", "أولاد", "بيوت"
]

for word in words:
    print(f"\n🔍 الكلمة: {word}")
    try:
        analysis = lemmatizer.analyze_text(word)
        if analysis and isinstance(analysis[0], dict):
            root = analysis[0].get("root", "❌")
            pos = analysis[0].get("pos", "❌")
            number = analysis[0].get("number", "❌")
            is_plural = "جمع" if number == "p" else "مفرد أو غير مؤكد"
            print(f"   ▸ الجذر: {root}")
            print(f"   ▸ النوع: {pos}")
            print(f"   ▸ العدد: {number}")
            print(f"   ✅ التصنيف: {is_plural}")
        else:
            print("   ⚠️ لم يتم إرجاع تحليل للكلمة.")
    except Exception as e:
        print(f"   ❌ خطأ أثناء التحليل: {e}")
