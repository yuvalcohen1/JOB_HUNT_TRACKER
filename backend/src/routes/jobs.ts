import { Router, Request, Response } from "express";
import { getAllJobs } from "../services/jobsService";

const router = Router();

// GET /api/jobs
router.get("/", async (req: Request, res: Response) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

export default router;
