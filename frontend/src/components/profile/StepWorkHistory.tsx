import type { ProfileFormData, WorkHistoryEntry } from "../../types/profile";

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";
const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function StepWorkHistory({
  form,
  onChange,
}: {
  form: ProfileFormData;
  onChange: (f: ProfileFormData) => void;
}) {
  const emptyEntry = (): WorkHistoryEntry => ({
    title: "",
    company: "",
    startDate: "",
    endDate: null,
    achievements: [""],
  });

  const updateEntry = (index: number, updated: WorkHistoryEntry) => {
    const next = [...form.workHistory];
    next[index] = updated;
    onChange({ ...form, workHistory: next });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-base font-bold text-slate-800 mb-1">Work history</p>
        <p className="text-xs text-slate-400 mb-5">
          Most recent first. Focus achievements on impact and numbers where
          possible.
        </p>
      </div>

      {form.workHistory.map((entry, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 bg-slate-50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Position {i + 1}
            </span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...form,
                  workHistory: form.workHistory.filter((_, j) => j !== i),
                })
              }
              className="text-xs text-rose-400 hover:text-rose-600 transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Job Title</label>
              <input
                className={inputClass}
                placeholder="e.g. Frontend Developer"
                value={entry.title}
                onChange={(e) =>
                  updateEntry(i, { ...entry, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input
                className={inputClass}
                placeholder="e.g. Acme Corp"
                value={entry.company}
                onChange={(e) =>
                  updateEntry(i, { ...entry, company: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="month"
                className={inputClass + " cursor-pointer"}
                value={entry.startDate}
                onChange={(e) =>
                  updateEntry(i, { ...entry, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="month"
                className={inputClass + " cursor-pointer"}
                placeholder="Leave empty if current"
                value={entry.endDate ?? ""}
                onChange={(e) =>
                  updateEntry(i, { ...entry, endDate: e.target.value || null })
                }
              />
              {entry.endDate === null && (
                <p className="text-xs text-indigo-500 mt-1">Current position</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Key Achievements</label>
            <p className="text-xs text-slate-400 mb-2">
              Write 2–5 bullets. Start with a strong verb. Add numbers where
              possible.
            </p>
            {entry.achievements.map((ach, j) => (
              <div key={j} className="flex gap-2 mb-2">
                <input
                  className={inputClass + " mt-0 flex-1"}
                  placeholder="e.g. Reduced load time by 40% through code splitting"
                  value={ach}
                  onChange={(e) => {
                    const next = [...entry.achievements];
                    next[j] = e.target.value;
                    updateEntry(i, { ...entry, achievements: next });
                  }}
                />
                {entry.achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateEntry(i, {
                        ...entry,
                        achievements: entry.achievements.filter(
                          (_, k) => k !== j,
                        ),
                      })
                    }
                    className="text-slate-300 hover:text-rose-400 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {entry.achievements.length < 5 && (
              <button
                type="button"
                onClick={() =>
                  updateEntry(i, {
                    ...entry,
                    achievements: [...entry.achievements, ""],
                  })
                }
                className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors mt-1"
              >
                + Add achievement
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange({
            ...form,
            workHistory: [...form.workHistory, emptyEntry()],
          })
        }
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
      >
        + Add position
      </button>
    </div>
  );
}
