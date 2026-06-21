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
  userId: string;
  title: string;
  company: string;
  status: Status;
  interestLevel: InterestLevel;
  appliedDate: string; // ISO date string, e.g. "2026-06-19"
  description: string;
  notes: string;
}

function mapRow(row: any): Job {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    company: row.company,
    status: row.status,
    interestLevel: row.interest_level,
    appliedDate: row.applied_date,
    description: row.description,
    notes: row.notes,
  };
}

export async function getAllJobs(userId: string): Promise<Job[]> {
  const jobs = await sql`SELECT * FROM jobs WHERE user_id = ${userId}`;
  return jobs.map(mapRow);
}

export async function createJob(
  userId: string,
  job: Omit<Job, "id" | "userId">,
): Promise<Job> {
  const [row] = await sql`
    INSERT INTO jobs (user_id, title, company, status, interest_level, applied_date, description, notes)
    VALUES (
      ${userId},
      ${job.title},
      ${job.company},
      ${job.status},
      ${job.interestLevel},
      ${job.appliedDate ?? null},
      ${job.description},
      ${job.notes}
    )
    RETURNING *
  `;

  return mapRow(row);
}

export async function updateJob(
  id: string,
  userId: string,
  updates: Partial<Omit<Job, "id" | "userId">>,
): Promise<Job | null> {
  const [row] = await sql`
    UPDATE jobs SET
      title          = COALESCE(${updates.title ?? null},          title),
      company        = COALESCE(${updates.company ?? null},        company),
      status         = COALESCE(${updates.status ?? null},         status),
      interest_level = COALESCE(${updates.interestLevel ?? null},  interest_level),
      applied_date   = COALESCE(${updates.appliedDate ?? null},    applied_date),
      description    = COALESCE(${updates.description ?? null},    description),
      notes          = COALESCE(${updates.notes ?? null},          notes)
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;

  return row ? mapRow(row) : null;
}

export async function deleteJob(id: string, userId: string): Promise<boolean> {
  const rows = await sql`
    DELETE FROM jobs WHERE id = ${id} AND user_id = ${userId} RETURNING id
  `;

  return rows.length > 0;
}
