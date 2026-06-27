import sql from "../db/client";

export interface WorkHistoryEntry {
  title: string;
  company: string;
  startDate: string; // e.g. "2021-03"
  endDate: string | null; // null = current
  achievements: string[]; // 3–5 bullet points
}

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  graduationYear: number | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  currentTitle: string | null;
  yearsOfExperience: number | null;
  targetRoles: string[];
  coreSkills: string[];
  softSkills: string[];
  industries: string[];
  certifications: string[];
  spokenLanguages: string[];
  workHistory: WorkHistoryEntry[];
  education: EducationEntry[];
  careerGoal: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapRow(row: any): UserProfile {
  return {
    id: row.id,
    userId: row.user_id,
    currentTitle: row.current_title,
    yearsOfExperience: row.years_of_experience,
    targetRoles: row.target_roles ?? [],
    coreSkills: row.core_skills ?? [],
    softSkills: row.soft_skills ?? [],
    industries: row.industries ?? [],
    certifications: row.certifications ?? [],
    spokenLanguages: row.spoken_languages ?? [],
    workHistory: row.work_history ?? [],
    education: row.education ?? [],
    careerGoal: row.career_goal,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const rows = await sql`
    SELECT * FROM user_profiles WHERE user_id = ${userId}
  `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function upsertProfile(
  userId: string,
  updates: Partial<
    Omit<UserProfile, "id" | "userId" | "createdAt" | "updatedAt">
  >,
): Promise<UserProfile> {
  const [row] = await sql`
    INSERT INTO user_profiles (
      user_id,
      current_title,
      years_of_experience,
      target_roles,
      core_skills,
      soft_skills,
      industries,
      certifications,
      spoken_languages,
      work_history,
      education,
      career_goal
    ) VALUES (
      ${userId},
      ${updates.currentTitle ?? null},
      ${updates.yearsOfExperience ?? null},
      ${updates.targetRoles ?? []}::text[],
      ${updates.coreSkills ?? []}::text[],
      ${updates.softSkills ?? []}::text[],
      ${updates.industries ?? []}::text[],
      ${updates.certifications ?? []}::text[],
      ${updates.spokenLanguages ?? []}::text[],
      ${JSON.stringify(updates.workHistory ?? [])}::jsonb,
      ${JSON.stringify(updates.education ?? [])}::jsonb,
      ${updates.careerGoal ?? null}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      current_title       = EXCLUDED.current_title,
      years_of_experience = EXCLUDED.years_of_experience,
      target_roles        = EXCLUDED.target_roles,
      core_skills         = EXCLUDED.core_skills,
      soft_skills         = EXCLUDED.soft_skills,
      industries          = EXCLUDED.industries,
      certifications      = EXCLUDED.certifications,
      spoken_languages    = EXCLUDED.spoken_languages,
      work_history        = EXCLUDED.work_history,
      education           = EXCLUDED.education,
      career_goal         = EXCLUDED.career_goal
    RETURNING *
  `;
  return mapRow(row);
}
