import { useState } from "react";

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";
const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function TagInput({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) onChange([...values, trimmed]);
    setInput("");
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2 mt-1">
        <input
          className={inputClass + " mt-0 flex-1"}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
        >
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map((v, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="text-indigo-400 hover:text-indigo-700 leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
