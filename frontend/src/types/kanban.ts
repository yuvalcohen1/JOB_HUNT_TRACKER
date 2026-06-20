export type Status =
  | "considering"
  | "applied"
  | "initial_interview"
  | "advanced_interview"
  | "offer"
  | "rejected";

export type InterestLevel = "dream" | "excited" | "neutral" | "backup";

export interface Job {
  id: string;
  title: string;
  company: string;
  status: Status;
  interestLevel: InterestLevel;
  appliedDate: string; // ISO date string, e.g. "2026-06-19"
  description: string;
  notes: string;
}

export function createEmptyJob(): Job {
  return {
    id: crypto.randomUUID(),
    title: "",
    company: "",
    status: "considering",
    interestLevel: "neutral",
    appliedDate: new Date().toISOString().split("T")[0],
    description: "",
    notes: "",
  };
}
