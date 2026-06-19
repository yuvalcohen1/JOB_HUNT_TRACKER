import { useState } from "react";
import type { Job, Column, InterestLevel } from "../../types/kanban";

interface JobDetailPanelProps {
  job: Job;
  onClose: () => void;
  onSave: (updated: Job) => void;
  onDelete: (id: string) => void;
}

const COLUMNS: { value: Column; label: string }[] = [
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

export default function JobDetailPanel({
  job,
  onClose,
  onSave,
  onDelete,
}: JobDetailPanelProps) {
  const [form, setForm] = useState<Job>({ ...job });

  const handleChange = (field: keyof Job, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Job Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Job Title
          </label>
          <input
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Company
          </label>
          <input
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Status
          </label>
          <select
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.column}
            onChange={(e) => handleChange("column", e.target.value as Column)}
          >
            {COLUMNS.map((col) => (
              <option key={col.value} value={col.value}>
                {col.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Interest Level
          </label>
          <select
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Applied Date
          </label>
          <input
            type="date"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.appliedDate}
            onChange={(e) => handleChange("appliedDate", e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Description
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            My Notes
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            placeholder="Write your thoughts about this position..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-2 pt-4 border-t border-gray-100 mt-4">
        <button
          onClick={() => onDelete(form.id)}
          className="px-4 py-2 rounded-lg border border-red-200 text-sm text-red-500 hover:bg-red-50"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
