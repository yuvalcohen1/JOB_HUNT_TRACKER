import { Router, Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/authService";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";

const router = Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ error: "email, password, and name are required" });
    return;
  }

  try {
    const user = await registerUser(email, password, name);
    res.status(201).json({ user });
  } catch (error: any) {
    if (error.message === "EMAIL_TAKEN") {
      res.status(409).json({ error: "Email already in use" });
      return;
    }
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  try {
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ user });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// POST /api/auth/logout
router.post(
  "/logout",
  authenticate,
  (req: AuthenticatedRequest, res: Response) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.json({ message: "Logged out successfully" });
  },
);

// GET /api/auth/me
router.get(
  "/me",
  authenticate,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await getUserById(req.userId!);
      res.json({ user });
    } catch {
      res.status(404).json({ error: "User not found" });
    }
  },
);

export default router;
