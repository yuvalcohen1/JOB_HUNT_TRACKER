import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { getProfile, upsertProfile } from "../services/profileService";

const router = Router();

// GET /api/profile
// Returns the current user's profile, or null if not yet created
router.get(
  "/",
  authenticate,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const profile = await getProfile(req.userId!);
      res.status(200).json({ profile });
    } catch (err) {
      console.error("GET /api/profile error:", err);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  },
);

// PUT /api/profile
// Creates or updates the profile (full or partial update)
router.put(
  "/",
  authenticate,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const profile = await upsertProfile(req.userId!, req.body);
      res.status(200).json({ profile });
    } catch (err) {
      console.error("PUT /api/profile error:", err);
      res.status(500).json({ error: "Failed to save profile" });
    }
  },
);

export default router;
