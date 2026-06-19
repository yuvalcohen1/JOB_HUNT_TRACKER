import type { Job } from "../types/kanban";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Startup Inc.",
    column: "applied",
    interestLevel: "excited",
    appliedDate: "2026-06-01",
    description:
      "Build and maintain React applications with a focus on performance and UX.",
    notes: "Referred by a friend. Good vibes from the job posting.",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Big Corp",
    column: "initial_interview",
    interestLevel: "neutral",
    appliedDate: "2026-05-20",
    description:
      "Work on Node.js backend and React frontend for an enterprise SaaS platform.",
    notes: "Recruiter reached out on LinkedIn.",
  },
  {
    id: "3",
    title: "Senior React Developer",
    company: "Dream Company",
    column: "considering",
    interestLevel: "dream",
    appliedDate: "2026-06-10",
    description: "Lead the frontend team building next-gen developer tools.",
    notes: "",
  },
  {
    id: "4",
    title: "UI Engineer",
    company: "Backup Ltd.",
    column: "rejected",
    interestLevel: "backup",
    appliedDate: "2026-05-15",
    description: "Design and implement UI components for a fintech product.",
    notes:
      "Got rejected after the first screen. Salary was below expectations anyway.",
  },
];
