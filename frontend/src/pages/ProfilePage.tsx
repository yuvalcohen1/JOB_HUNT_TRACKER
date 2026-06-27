import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileApi } from "../services/profileApi";
import {
  type ProfileFormData,
  emptyProfileForm,
  profileToForm,
  formToProfile,
} from "../types/profile";
import StepBasics from "../components/profile/StepBasics";
import StepSkills from "../components/profile/StepSkills";
import StepWorkHistory from "../components/profile/StepWorkHistory";
import StepEducation from "../components/profile/StepEducation";
import StepCareerGoal from "../components/profile/StepCareerGoal";

const STEPS = ["Basics", "Skills", "Work History", "Education", "Career Goal"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ProfileFormData>(emptyProfileForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    profileApi.get().then((profile) => {
      if (profile) setForm(profileToForm(profile));
      setLoading(false);
    });
  }, []);

  const isLastStep = step === STEPS.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      setSaving(true);
      setError(null);
      try {
        await profileApi.save(formToProfile(form));
        navigate("/");
      } catch (err: any) {
        setError(err.message ?? "Failed to save profile");
      } finally {
        setSaving(false);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading your profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
        <span className="text-sm font-bold text-indigo-600 tracking-tight">
          Job Hunt Tracker
        </span>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to board
        </button>
      </header>

      <div className="w-full bg-slate-100 h-1">
        <div
          className="bg-indigo-500 h-1 transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="w-full max-w-xl">
          <div className="flex gap-1 mb-8">
            {STEPS.map((label, i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  i === step
                    ? "bg-indigo-600 text-white"
                    : i < step
                      ? "bg-indigo-100 text-indigo-600 cursor-pointer hover:bg-indigo-200"
                      : "bg-slate-100 text-slate-400 cursor-default"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            {step === 0 && <StepBasics form={form} onChange={setForm} />}
            {step === 1 && <StepSkills form={form} onChange={setForm} />}
            {step === 2 && <StepWorkHistory form={form} onChange={setForm} />}
            {step === 3 && <StepEducation form={form} onChange={setForm} />}
            {step === 4 && <StepCareerGoal form={form} onChange={setForm} />}
          </div>

          {error && (
            <p className="text-sm text-rose-500 mb-4 text-center">{error}</p>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="cursor-pointer px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={saving}
              className="cursor-pointer flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold transition-all shadow-sm shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving…"
                : isLastStep
                  ? "Save & go to board"
                  : "Continue"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
