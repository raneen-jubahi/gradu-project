import React from "react";

export function Table({ children }) {
  return <table className="table-auto w-full border">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-yellow-100">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="border px-4 py-2 text-yellow-800 text-right">{children}</th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }) {
  return <td className="border px-4 py-2">{children}</td>;
}
