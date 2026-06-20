import { useState, useEffect } from "react";
import { type Job, type Status, createEmptyJob } from "../../types/kanban";
import { jobsApi } from "../../services/jobsApi";
import KanbanColumn from "./KanbanColumn";
import JobDetailPanel from "./JobDetailPanel";

const COLUMNS: Status[] = [
  "considering",
  "applied",
  "initial_interview",
  "advanced_interview",
  "offer",
  "rejected",
];

export default function KanbanBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    jobsApi
      .getAll()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getJobsForColumn = (column: Status) =>
    jobs.filter((job) => job.status === column);

  const handleCardClick = (job: Job) => setSelectedJob(job);
  const handleClosePanel = () => setSelectedJob(null);

  const handleSave = async (updated: Job) => {
    const needsDate =
      updated.status !== "considering" &&
      updated.status !== "rejected" &&
      !updated.appliedDate;

    const jobToSave: Job = needsDate
      ? { ...updated, appliedDate: new Date().toISOString().split("T")[0] }
      : updated;

    try {
      const exists = jobs.some((j) => j.id === jobToSave.id);
      if (exists) {
        const saved = await jobsApi.update(jobToSave.id, jobToSave);
        setJobs((prev) => prev.map((j) => (j.id === saved.id ? saved : j)));
      } else {
        const created = await jobsApi.create(jobToSave);
        setJobs((prev) => [...prev, created]);
      }
      setSelectedJob(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddJob = () => setSelectedJob(createEmptyJob());

  const handleDelete = async (id: string) => {
    try {
      await jobsApi.delete(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setSelectedJob(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading jobs...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 overflow-x-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🗂 Job Search Board
        </h1>
        <button
          onClick={handleAddJob}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Add Job
        </button>
        <div className="flex gap-4 items-start">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column}
              column={column}
              jobs={getJobsForColumn(column)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {selectedJob && (
        <div className="w-96 border-l border-gray-200 bg-white shadow-xl p-6 overflow-y-auto">
          <JobDetailPanel
            job={selectedJob}
            onClose={handleClosePanel}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
