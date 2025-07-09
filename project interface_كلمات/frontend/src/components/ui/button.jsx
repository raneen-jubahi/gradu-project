
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold text-white transition duration-200 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
