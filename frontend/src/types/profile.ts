export interface WorkHistoryEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  achievements: string[];
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

// What the multi-step form works with internally
export interface ProfileFormData {
  currentTitle: string;
  yearsOfExperience: string; // string in form, converted to number on save
  targetRoles: string[];
  coreSkills: string[];
  softSkills: string[];
  industries: string[];
  certifications: string[];
  spokenLanguages: string[];
  workHistory: WorkHistoryEntry[];
  education: EducationEntry[];
  careerGoal: string;
}

export const emptyProfileForm = (): ProfileFormData => ({
  currentTitle: "",
  yearsOfExperience: "",
  targetRoles: [],
  coreSkills: [],
  softSkills: [],
  industries: [],
  certifications: [],
  spokenLanguages: [],
  workHistory: [],
  education: [],
  careerGoal: "",
});

export function profileToForm(profile: UserProfile): ProfileFormData {
  return {
    currentTitle: profile.currentTitle ?? "",
    yearsOfExperience: profile.yearsOfExperience?.toString() ?? "",
    targetRoles: profile.targetRoles,
    coreSkills: profile.coreSkills,
    softSkills: profile.softSkills,
    industries: profile.industries,
    certifications: profile.certifications,
    spokenLanguages: profile.spokenLanguages,
    workHistory: profile.workHistory,
    education: profile.education,
    careerGoal: profile.careerGoal ?? "",
  };
}

export function formToProfile(form: ProfileFormData): Partial<UserProfile> {
  return {
    ...form,
    yearsOfExperience: form.yearsOfExperience
      ? parseInt(form.yearsOfExperience, 10)
      : null,
  };
}
