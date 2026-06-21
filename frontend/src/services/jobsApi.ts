import type { Job } from "../types/kanban";

const BASE_URL = "http://localhost:3000/api/jobs";

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Not authenticated");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

const defaultOptions: RequestInit = {
  credentials: "include",
};

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await fetch(BASE_URL, defaultOptions);
    return handleResponse<Job[]>(res);
  },

  create: async (job: Job): Promise<Job> => {
    const res = await fetch(BASE_URL, {
      ...defaultOptions,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    return handleResponse<Job>(res);
  },

  update: async (id: string, job: Job): Promise<Job> => {
    const payload = {
      ...job,
      appliedDate: job.appliedDate || new Date().toISOString().split("T")[0],
    };
    const res = await fetch(`${BASE_URL}/${id}`, {
      ...defaultOptions,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<Job>(res);
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      ...defaultOptions,
      method: "DELETE",
    });
    return handleResponse<void>(res);
  },
};
