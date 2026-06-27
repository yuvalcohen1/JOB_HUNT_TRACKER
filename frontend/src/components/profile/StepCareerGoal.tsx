import type { ProfileFormData } from "../../types/profile";

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";
const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function StepCareerGoal({
  form,
  onChange,
}: {
  form: ProfileFormData;
  onChange: (f: ProfileFormData) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-base font-bold text-slate-800 mb-1">
          Your career goal
        </p>
        <p className="text-xs text-slate-400 mb-5">
          Write 2–3 sentences in your own voice. What kind of role are you
          looking for, and what do you bring to it? This becomes the honesty
          anchor for every summary we generate — the AI will never claim more
          than what you write here.
        </p>
      </div>
      <div>
        <label className={labelClass}>Career Goal Statement</label>
        <textarea
          rows={6}
          className={inputClass + " resize-none"}
          placeholder="e.g. I am a frontend-focused developer with 4 years of experience building React applications..."
          value={form.careerGoal}
          onChange={(e) => onChange({ ...form, careerGoal: e.target.value })}
        />
        <p className="text-xs text-slate-400 mt-1">
          {form.careerGoal.length} characters
        </p>
      </div>
    </div>
  );
}
