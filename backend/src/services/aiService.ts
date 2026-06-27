import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "./profileService";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface GenerateSummaryInput {
  jobTitle: string;
  company: string;
  jobDescription: string | null;
  profile: UserProfile;
}

export async function generateProfessionalSummary(
  input: GenerateSummaryInput,
): Promise<string> {
  const { jobTitle, company, jobDescription, profile } = input;

  const workHistoryText = profile.workHistory
    .map(
      (w) =>
        `- ${w.title} at ${w.company} (${w.startDate} – ${w.endDate ?? "present"})\n` +
        w.achievements.map((a) => `  • ${a}`).join("\n"),
    )
    .join("\n");

  const educationText = profile.education
    .map(
      (e) =>
        `- ${e.degree} in ${e.field}, ${e.institution}${e.graduationYear ? ` (${e.graduationYear})` : ""}`,
    )
    .join("\n");

  const prompt = `
You are an expert CV writer specializing in ATS-optimized professional summaries.

Your task is to write a professional summary for a job application. You must follow these rules strictly:
- Write 3–5 sentences only.
- Write in first person without using the word "I".
- Only use experience, skills, and background explicitly provided in the candidate profile below. Do not invent, exaggerate, or imply anything not stated.
- Naturally mirror keywords and phrases from the job description to maximize ATS compatibility — but never copy full sentences from the job description.
- The tone should be confident and professional, grounded in the candidate's actual career goal statement.
- Do not include a title or heading. Output only the summary paragraph itself.

---

CANDIDATE PROFILE:

Current title: ${profile.currentTitle ?? "Not specified"}
Years of experience: ${profile.yearsOfExperience ?? "Not specified"}
Target roles: ${profile.targetRoles.join(", ") || "Not specified"}
Industries: ${profile.industries.join(", ") || "Not specified"}
Technical skills: ${profile.coreSkills.join(", ") || "Not specified"}
Soft skills: ${profile.softSkills.join(", ") || "Not specified"}
Certifications: ${profile.certifications.join(", ") || "None"}
Languages: ${profile.spokenLanguages.join(", ") || "Not specified"}

Work history:
${workHistoryText || "Not provided"}

Education:
${educationText || "Not provided"}

Career goal (candidate's own words — treat this as the honesty anchor):
"${profile.careerGoal ?? "Not provided"}"

---

TARGET JOB:

Job title: ${jobTitle}
Company: ${company}
Job description:
${jobDescription ?? "Not provided"}

---

Write the professional summary now:
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  const text = response.text?.trim();
  if (!text) throw new Error("No response from AI model");
  return text;
}
