import TagInput from "./TagInput";
import type { ProfileFormData } from "../../types/profile";

const inputClass =
  "mt-1 w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-colors";
const labelClass =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wide";

export default function StepBasics({
  form,
  onChange,
}: {
  form: ProfileFormData;
  onChange: (f: ProfileFormData) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-base font-bold text-slate-800 mb-1">About you</p>
        <p className="text-xs text-slate-400 mb-5">
          The basics that anchor every summary we generate for you.
        </p>
      </div>
      <div>
        <label className={labelClass}>Current Job Title</label>
        <input
          className={inputClass}
          placeholder="e.g. Frontend Developer"
          value={form.currentTitle}
          onChange={(e) => onChange({ ...form, currentTitle: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Years of Experience</label>
        <input
          type="number"
          min={0}
          max={50}
          className={inputClass}
          placeholder="e.g. 4"
          value={form.yearsOfExperience}
          onChange={(e) =>
            onChange({ ...form, yearsOfExperience: e.target.value })
          }
        />
      </div>
      <TagInput
        label="Target Roles"
        placeholder="e.g. Full Stack Developer"
        values={form.targetRoles}
        onChange={(v) => onChange({ ...form, targetRoles: v })}
      />
      <TagInput
        label="Industries"
        placeholder="e.g. SaaS, Fintech"
        values={form.industries}
        onChange={(v) => onChange({ ...form, industries: v })}
      />
    </div>
  );
}
