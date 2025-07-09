import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ أضف هذا السطر هنا للتأكد إن الملف انقرأ فعليًا
console.log("✅ main.jsx loaded");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
