import type { Job } from "../types/kanban";

const BASE_URL = "http://localhost:3000/api/jobs";

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },

  create: async (job: Job): Promise<Job> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error("Failed to create job");
    return res.json();
  },

  update: async (id: string, job: Job): Promise<Job> => {
    const payload = {
      ...job,
      appliedDate: job.appliedDate || new Date().toISOString().split("T")[0],
    };
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update job");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete job");
  },
};
