import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Job, type Status, createEmptyJob } from "../../types/kanban";
import { jobsApi } from "../../services/jobsApi";
import { authApi } from "../../services/authApi";
import KanbanColumn from "./KanbanColumn";
import JobDetailPanel from "./JobDetailPanel";
import BoardHeader from "./BoardHeader";

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
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-sm text-slate-400 font-medium">
            Loading your jobs…
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <BoardHeader
          jobCount={jobs.length}
          onAddJob={handleAddJob}
          onLogout={handleLogout}
        />

        <div className="flex-1 overflow-x-auto overflow-y-hidden flex justify-center">
          <div className="inline-flex gap-4 h-full px-8 py-6 items-start">
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
      </div>

      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          onClick={handleClosePanel}
        >
          <div
            className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 overflow-y-auto p-6">
              <JobDetailPanel
                job={selectedJob}
                onClose={handleClosePanel}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
