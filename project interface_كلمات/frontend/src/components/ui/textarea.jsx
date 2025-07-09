import React from "react";

export function Textarea({ value, onChange, placeholder, className = "" }) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`}
    />
  );
}
