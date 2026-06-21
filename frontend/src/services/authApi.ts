import type { User } from "../types/auth";

const BASE_URL = "http://localhost:3000/api/auth";

export const authApi = {
  register: async (
    email: string,
    password: string,
    name: string,
  ): Promise<User> => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? "Failed to register");
    }
    const data = await res.json();
    return data.user;
  },

  login: async (email: string, password: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? "Failed to log in");
    }
    const data = await res.json();
    return data.user;
  },

  logout: async (): Promise<void> => {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};
