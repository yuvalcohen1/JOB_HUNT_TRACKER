import sql from "../db/client";

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

export async function getAllJobs(): Promise<Job[]> {
  const jobs = await sql`SELECT * FROM jobs`;
  return jobs.map((row) => ({
    id: row.id,
    title: row.title,
    company: row.company,
    status: row.status,
    interestLevel: row.interest_level,
    appliedDate: row.applied_date,
    description: row.description,
    notes: row.notes,
  }));
}
