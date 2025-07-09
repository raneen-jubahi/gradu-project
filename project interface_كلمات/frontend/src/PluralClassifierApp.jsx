import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { motion } from "framer-motion";

export default function PluralClassifierApp() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const stopwords = [
    "إلى",
    "من",
    "عن",
    "على",
    "في",
    "ب",
    "ك",
    "ل",
    "حتى",
    "ثم",
    "إن",
    "أن",
    "لكن",
    "لا",
    "لم",
    "لن",
    "ما",
    "هل",
    "لما",
    "إذا",
    "كلما",
    "أو",
    "بل",
    "و",
    "ف",
    "نحو",
    "مثلاً",
    "كذا",
    "مع",
    "عند",
    "قبل",
    "بعد",
    "أمام",
    "خلف",
    "إذ",
    "إذا",
    "إذما",
    "إذن",
    "آه",
    "آها",
    "إلى",
    "إلي",
    "إليك",
    "إليكم",
    "إليكما",
    "إليكن",
    "أم",
    "أما",
    "إما",
    "أن",
    "إن",
    "إنا",
    "أنا",
    "أنتم",
    "أنتما",
    "أنتن",
    "أنى",
    "أو",
    "أولئك",
    "أولاء",
    "إي",
    "إياك",
    "إياكم",
    "إياكما",
    "إياكن",
    "إياه",
    "إياها",
    "إياهم",
    "إياهما",
    "إياهن",
    "إياي",
    "إيانا",
    "إذ",
    "إذًا",
    "بخٍ",
    "بس",
    "بعد",
    "بعض",
    "بك",
    "بكم",
    "بكما",
    "بكن",
    "به",
    "بها",
    "بهم",
    "بهما",
    "بهن",
    "بي",
    "بنا",
    "بين",
    "بيد",
    "تلك",
    "تلكم",
    "تلكما",
    "ثم",
    "ثمة",
    "حاشا",
    "حبذا",
    "حتى",
    "حيث",
    "حيثما",
    "حين",
    "خلا",
    "دون",
    "ذا",
    "ذات",
    "ذاك",
    "ذو",
    "ذي",
    "ذين",
    "ذلك",
    "ذلكم",
    "ذلكما",
    "ذه",
    "هذه",
    "هكذا",
    "هل",
    "هلا",
    "هم",
    "هما",
    "هن",
    "هو",
    "هي",
    "هيا",
    "هيت",
    "هيهات",
    "وا",
    "وإذا",
    "وإن",
    "والذي",
    "والتي",
    "ولا",
    "ولكن",
    "ولو",
    "وما",
    "ومن",
    "وهو",
    "يا",
    "أجل",
    "أجمع",
    "أخ",
    "أخا",
    "أخو",
    "أف",
    "أقل",
    "أمام",
    "أمس",
    "أنى",
    "أول",
    "أين",
    "أي",
    "أيا",
    "بخ",
    "بس",
    "ثم",
    "تحت",
    "جلل",
    "خلف",
    "خلال",
    "دون",
    "ذات",
    "رغم",
    "سوف",
    "سوى",
    "شبه",
    "صه",
    "ضد",
    "ضمن",
    "طرا",
    "عدا",
    "عدد",
    "عسى",
    "عل",
    "على",
    "عليك",
    "عند",
    "غير",
    "فإذا",
    "فإن",
    "فقط",
    "قبل",
    "قد",
    "كأن",
    "كأنما",
    "كأي",
    "كأين",
    "كاد",
    "كان",
    "كأن",
    "كذا",
    "كذلك",
    "كل",
    "كلا",
    "كلتا",
    "كلم",
    "كم",
    "كي",
    "كيف",
    "كيفما",
    "لا",
    "لاسيما",
    "لات",
    "لدى",
    "لست",
    "لعل",
    "لكن",
    "لكي",
    "لم",
    "لن",
    "لو",
    "لولا",
    "لوما",
    "ليت",
    "ليس",
    "ما",
    "ماذا",
    "مازال",
    "متى",
    "مثل",
    "مثلا",
    "مد",
    "مذ",
    "مع",
    "معاذ",
    "مما",
    "من",
    "منذ",
    "مه",
    "مهما",
    "نحن",
    "نحو",
    "نعم",
    "ها",
    "هاتان",
    "هاته",
    "هاتي",
    "هاتهما",
    "هاتيكم",
    "هاتهما",
    "هاته",
    "هاك",
    "هاكم",
    "هانا",
    "هؤلاء",
    "هاهنا",
    "هيهات",
    "و",
    "واحد",
    "وإن",
    "وراء",
    "وسط",
    "وما",
    "وهي",
    "وهو",
    "يا",
    "ربما",
  ];

  const classifyWords = async () => {
    setLoading(true);
    setNotice("");
    setResults([]);

    const cleanedInput = input.replace(/،/g, ",").trim();

    if (cleanedInput.includes(" ") && !cleanedInput.includes(",")) {
      alert("⚠️ يرجى الفصل بين الكلمات باستخدام فواصل فقط وليس فراغات.");
      setLoading(false);
      return;
    }

    const isMultipleWords = cleanedInput.includes(",");
    const words = isMultipleWords
      ? cleanedInput.split(/[,،]+/).map((w) => w.trim())
      : [cleanedInput];

    const filteredWords = words.filter(
      (w) => w && /^[\u0600-\u06FF\s]+$/.test(w) && !stopwords.includes(w)
    );

    if (filteredWords.length === 0) {
      alert("يرجى إدخال كلمات صالحة للتصنيف.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: filteredWords }),
      });

      const data = await res.json();
      setResults(data.results || []);
      if (data.notice) setNotice(data.notice);
    } catch (error) {
      console.error("Error during classification:", error);
      alert("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-10 px-4 sm:px-10 font-[Tajawal]">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/broken-plural-logo.png"
          alt="Broken Plural Logo"
          className="mx-auto mb-4 w-24 h-24 rounded-full border-2 border-yellow-600 shadow-md"
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-900 mb-2">
          🧠 تصنيف الجموع في اللغة العربية
        </h1>
        <p className="text-yellow-800 mt-2 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-right">
          مشروع يستخدم تقنيات الذكاء الاصطناعي لتحليل الجموع في اللغة العربية
          وتصنيفها صرفيًّا إلى ثلاثة أنواع رئيسية: جمع التكسير، جمع المؤنث
          السالم، وجمع المذكر السالم.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <label className="block mb-2 text-yellow-800 font-semibold text-right text-lg">
          أدخل كلمات الجمع هنا:
        </label>
        <Textarea
          placeholder="مثلاً: مهندسات، كتب، طلاب..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white border-yellow-300 focus:ring-yellow-500 rounded-xl"
        />

        <Button
          className="mt-2 text-sm underline text-yellow-800 hover:text-yellow-900"
          variant="ghost"
          onClick={() => {
            const example = "كتب، مهندسات، لاعبون";
            setInput(example);
            setTimeout(() => {
              document.querySelector(".bg-yellow-600")?.click();
            }, 100);
          }}
        >
          🎯 جرّب مثال جاهز
        </Button>

        <Button
          onClick={classifyWords}
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 w-full rounded-full shadow-md"
          disabled={loading || !input.trim()}
        >
          {loading ? "...يتم التصنيف" : "🔍 تصنيف الكلمات"}
        </Button>
      </div>

      {results.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-yellow-800 mb-4 text-center">
            📊 النتائج:
          </h2>

          {notice && (
            <div className="bg-red-100 text-red-800 font-medium p-3 rounded-xl border border-red-300 mb-6 text-right">
              ⚠️ {notice}
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>🔠 الكلمة</TableHead>
                <TableHead>📌 التصنيف</TableHead>
                <TableHead>🔢 نسبة الثقة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r, i) => (
                <TableRow key={i} className="hover:bg-yellow-50">
                  <TableCell className="font-medium text-yellow-900">
                    {r.word}
                  </TableCell>

                  <TableCell className="capitalize font-semibold text-sm sm:text-base">
                    {r.error ? (
                      <span className="text-red-600">{r.error}</span>
                    ) : (
                      <>
                        {r.label === "broken" && "🧩 "}
                        {r.label === "sound_feminine" && "👩‍🏫 "}
                        {r.label === "sound_masculine" && "👨‍💼 "}
                        <span
                          className={
                            r.label === "broken"
                              ? "text-red-600"
                              : r.label === "sound_feminine"
                              ? "text-pink-600"
                              : "text-blue-600"
                          }
                        >
                          {r.label.replace("_", " ")}
                        </span>
                      </>
                    )}
                  </TableCell>

                  <TableCell className="text-yellow-900 w-48">
                    {r.error ? (
                      <span className="text-yellow-400 italic text-sm">
                        غير متوفر
                      </span>
                    ) : (
                      <>
                        <div className="text-xs mb-1">
                          {r.confidence.toFixed(2)}%
                        </div>
                        <div className="w-full bg-yellow-100 rounded-full h-2.5">
                          <div
                            className="bg-yellow-600 h-2.5 rounded-full"
                            style={{ width: `${r.confidence.toFixed(0)}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}

      <footer className="mt-16 text-center text-sm text-yellow-800 border-t pt-4 border-yellow-200">
        Graduation Project - 2025 | Design and Development: Raneen Jabhi |
        Palestine Technical University - Khadouri
        <br />
        <a
          href="https://github.com/raneen-jubahi"
          className="text-yellow-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 https://github.com/raneen-jubahi
        </a>
      </footer>
    </div>
  );
}
