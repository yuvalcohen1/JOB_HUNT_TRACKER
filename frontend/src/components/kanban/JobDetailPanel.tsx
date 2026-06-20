import { useEffect, useState, useCallback } from "react";
import type { Job, Status, InterestLevel } from "../../types/kanban";

interface JobDetailPanelProps {
  job: Job;
  onClose: () => void;
  onSave: (updated: Job) => void;
  onDelete: (id: string) => void;
}

const COLUMNS: { value: Status; label: string }[] = [
  { value: "considering", label: "Considering" },
  { value: "applied", label: "Applied" },
  { value: "initial_interview", label: "Initial Interview" },
  { value: "advanced_interview", label: "Advanced Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const INTEREST_LEVELS: { value: InterestLevel; label: string }[] = [
  { value: "dream", label: "⭐ Dream" },
  { value: "excited", label: "🔥 Excited" },
  { value: "neutral", label: "😐 Neutral" },
  { value: "backup", label: "🪂 Backup" },
];

const toDateInputValue = (value: string | null): string => {
  if (!value) return "";
  return value.split("T")[0];
};

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";

const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function JobDetailPanel({
  job,
  onClose,
  onSave,
  onDelete,
}: JobDetailPanelProps) {
  const [form, setForm] = useState<Job>(() => ({
    ...job,
    appliedDate: toDateInputValue(job.appliedDate),
  }));
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    setForm({
      ...job,
      appliedDate: toDateInputValue(job.appliedDate),
    });
    setConfirmingDelete(false);
  }, [job.id]);

  // Save on Enter, but not when focus is inside a textarea (multiline input)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        e.key === "Enter" &&
        (e.target as HTMLElement).tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onSave(form);
      }
      if (e.key === "Escape") {
        onClose();
      }
    },
    [form, onSave, onClose],
  );

  const handleChange = (field: keyof Job, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isNew = !job.company && !job.title;

  return (
    <div className="flex flex-col h-full" onKeyDown={handleKeyDown}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            {isNew ? "Add New Job" : "Edit Job"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isNew
              ? "Fill in the details below"
              : form.company || "Update the details below"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-sm"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
        <div>
          <label className={labelClass}>Job Title</label>
          <input
            className={inputClass}
            placeholder="e.g. Senior Product Designer"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Company</label>
          <input
            className={inputClass}
            placeholder="e.g. Acme Corp"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass + " cursor-pointer"}
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value as Status)}
            >
              {COLUMNS.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Interest</label>
            <select
              className={inputClass + " cursor-pointer"}
              value={form.interestLevel}
              onChange={(e) =>
                handleChange("interestLevel", e.target.value as InterestLevel)
              }
            >
              {INTEREST_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Applied Date</label>
          <input
            type="date"
            className={inputClass + " cursor-pointer"}
            value={form.appliedDate ?? ""}
            onChange={(e) => handleChange("appliedDate", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows={4}
            className={inputClass + " resize-none"}
            placeholder="Paste the job description here…"
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>My Notes</label>
          <textarea
            rows={4}
            className={inputClass + " resize-none"}
            placeholder="Write your thoughts about this position…"
            value={form.notes ?? ""}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-2 pt-4 border-t border-slate-100 mt-4">
        {confirmingDelete ? (
          // Confirmation state — replaces the whole footer row
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-slate-500 flex-1">
              Delete this job?
            </span>
            <button
              onClick={() => setConfirmingDelete(false)}
              className="cursor-pointer px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Keep it
            </button>
            <button
              onClick={() => onDelete(form.id)}
              className="cursor-pointer px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors"
            >
              Yes, delete
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setConfirmingDelete(true)}
              className="cursor-pointer px-3 py-2 rounded-lg border border-rose-200 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
              title="Delete job"
            >
              🗑
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="cursor-pointer flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold transition-all shadow-sm shadow-indigo-200"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
