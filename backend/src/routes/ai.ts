import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import { getProfile } from "../services/profileService";
import { generateProfessionalSummary } from "../services/aiService";
import { saveGeneratedSummary } from "../services/jobsService";

const router = Router();

// POST /api/ai/generate-summary
router.post(
  "/generate-summary",
  authenticate,
  async (req: AuthenticatedRequest, res: Response) => {
    const { jobId, jobTitle, company, jobDescription } = req.body;

    if (!jobId || !jobTitle || !company) {
      res
        .status(400)
        .json({ error: "jobId, jobTitle, and company are required" });
      return;
    }

    // Profile completeness gate
    const profile = await getProfile(req.userId!);
    if (!profile) {
      res.status(400).json({
        error: "profile_incomplete",
        message: "Please complete your profile before generating a summary.",
      });
      return;
    }

    const hasMinimumData =
      profile.coreSkills.length > 0 && profile.workHistory.length > 0;

    if (!hasMinimumData) {
      res.status(400).json({
        error: "profile_incomplete",
        message:
          "Please add at least your technical skills and one work history entry to your profile.",
      });
      return;
    }

    try {
      const summary = await generateProfessionalSummary({
        jobTitle,
        company,
        jobDescription: jobDescription ?? null,
        profile,
      });

      await saveGeneratedSummary(jobId, req.userId!, summary);

      res.status(200).json({ summary });
    } catch (err) {
      console.error("POST /api/ai/generate-summary error:", err);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  },
);

export default router;
