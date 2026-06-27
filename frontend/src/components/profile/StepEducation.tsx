import type { ProfileFormData, EducationEntry } from "../../types/profile";

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";
const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function StepEducation({
  form,
  onChange,
}: {
  form: ProfileFormData;
  onChange: (f: ProfileFormData) => void;
}) {
  const emptyEntry = (): EducationEntry => ({
    degree: "",
    field: "",
    institution: "",
    graduationYear: null,
  });

  const updateEntry = (index: number, updated: EducationEntry) => {
    const next = [...form.education];
    next[index] = updated;
    onChange({ ...form, education: next });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-base font-bold text-slate-800 mb-1">Education</p>
        <p className="text-xs text-slate-400 mb-5">
          Include degrees and any relevant formal training.
        </p>
      </div>

      {form.education.map((entry, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 bg-slate-50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Degree {i + 1}
            </span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...form,
                  education: form.education.filter((_, j) => j !== i),
                })
              }
              className="text-xs text-rose-400 hover:text-rose-600 transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Degree</label>
              <input
                className={inputClass}
                placeholder="e.g. B.Sc."
                value={entry.degree}
                onChange={(e) =>
                  updateEntry(i, { ...entry, degree: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Field of Study</label>
              <input
                className={inputClass}
                placeholder="e.g. Computer Science"
                value={entry.field}
                onChange={(e) =>
                  updateEntry(i, { ...entry, field: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Institution</label>
              <input
                className={inputClass}
                placeholder="e.g. Tel Aviv University"
                value={entry.institution}
                onChange={(e) =>
                  updateEntry(i, { ...entry, institution: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Graduation Year</label>
              <input
                type="number"
                min={1950}
                max={2030}
                className={inputClass}
                placeholder="e.g. 2020"
                value={entry.graduationYear ?? ""}
                onChange={(e) =>
                  updateEntry(i, {
                    ...entry,
                    graduationYear: e.target.value
                      ? parseInt(e.target.value, 10)
                      : null,
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange({ ...form, education: [...form.education, emptyEntry()] })
        }
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
      >
        + Add degree
      </button>
    </div>
  );
}
