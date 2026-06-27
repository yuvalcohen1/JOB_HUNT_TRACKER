import type { UserProfile } from "../types/profile";

const BASE_URL = "http://localhost:3000/api/profile";

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Not authenticated");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Request failed");
  }
  return res.json();
}

const defaultOptions: RequestInit = {
  credentials: "include",
};

export const profileApi = {
  get: async (): Promise<UserProfile | null> => {
    const res = await fetch(BASE_URL, defaultOptions);
    const data = await handleResponse<{ profile: UserProfile | null }>(res);
    return data.profile;
  },

  save: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await fetch(BASE_URL, {
      ...defaultOptions,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await handleResponse<{ profile: UserProfile }>(res);
    return data.profile;
  },
};
