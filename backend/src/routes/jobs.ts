import { Router, Request, Response } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../services/jobsService";

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

// POST /api/jobs
router.post("/", async (req: Request, res: Response) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// PATCH /api/jobs/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const job = await updateJob(req.params.id as string, req.body);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await deleteJob(req.params.id as string);
    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
