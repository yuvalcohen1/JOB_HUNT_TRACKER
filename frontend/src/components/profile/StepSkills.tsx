import TagInput from "./TagInput";
import type { ProfileFormData } from "../../types/profile";

export default function StepSkills({
  form,
  onChange,
}: {
  form: ProfileFormData;
  onChange: (f: ProfileFormData) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-base font-bold text-slate-800 mb-1">Your skills</p>
        <p className="text-xs text-slate-400 mb-5">
          Be specific with technical skills — tools, languages, and frameworks
          matter most for ATS matching.
        </p>
      </div>
      <TagInput
        label="Technical Skills"
        placeholder="e.g. React, TypeScript, PostgreSQL"
        values={form.coreSkills}
        onChange={(v) => onChange({ ...form, coreSkills: v })}
      />
      <TagInput
        label="Soft Skills"
        placeholder="e.g. Cross-functional collaboration"
        values={form.softSkills}
        onChange={(v) => onChange({ ...form, softSkills: v })}
      />
      <TagInput
        label="Certifications"
        placeholder="e.g. AWS Certified Developer"
        values={form.certifications}
        onChange={(v) => onChange({ ...form, certifications: v })}
      />
      <TagInput
        label="Languages"
        placeholder="e.g. English, Hebrew"
        values={form.spokenLanguages}
        onChange={(v) => onChange({ ...form, spokenLanguages: v })}
      />
    </div>
  );
}
