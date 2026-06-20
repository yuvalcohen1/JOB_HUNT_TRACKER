import { useState } from "react";
import { type Job, type Status, createEmptyJob } from "../../types/kanban";
import { mockJobs } from "../../data/mockJobs";
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
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const getJobsForColumn = (column: Status) =>
    jobs.filter((job) => job.status === column);

  const handleCardClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleClosePanel = () => {
    setSelectedJob(null);
  };

  const handleSave = (updated: Job) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j.id === updated.id);
      return exists
        ? prev.map((j) => (j.id === updated.id ? updated : j))
        : [...prev, updated];
    });
    setSelectedJob(null);
  };

  const handleAddJob = () => {
    setSelectedJob(createEmptyJob());
  };

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setSelectedJob(null);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Board */}
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
