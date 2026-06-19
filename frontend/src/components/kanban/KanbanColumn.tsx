import type { Job, Column } from "../../types/kanban";
import JobCard from "./JobCard";

interface KanbanColumnProps {
  column: Column;
  jobs: Job[];
  onCardClick: (job: Job) => void;
}

const columnConfig: Record<Column, { label: string; headerClass: string }> = {
  considering: {
    label: "Considering",
    headerClass: "bg-purple-100 text-purple-800",
  },
  applied: { label: "Applied", headerClass: "bg-blue-100 text-blue-800" },
  initial_interview: {
    label: "Initial Interview",
    headerClass: "bg-yellow-100 text-yellow-800",
  },
  advanced_interview: {
    label: "Advanced Interview",
    headerClass: "bg-orange-100 text-orange-800",
  },
  offer: { label: "Offer 🎉", headerClass: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", headerClass: "bg-red-100 text-red-800" },
};

export default function KanbanColumn({
  column,
  jobs,
  onCardClick,
}: KanbanColumnProps) {
  const { label, headerClass } = columnConfig[column];

  return (
    <div className="flex flex-col bg-gray-50 rounded-2xl p-3 min-w-[220px] w-64 shrink-0">
      {/* Column header */}
      <div
        className={`flex items-center justify-between rounded-lg px-3 py-2 mb-3 ${headerClass}`}
      >
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs font-bold bg-white bg-opacity-60 rounded-full px-2 py-0.5">
          {jobs.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 flex-1">
        {jobs.length === 0 ? (
          <div className="text-xs text-gray-400 text-center mt-4">
            No jobs here yet
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={onCardClick} />
          ))
        )}
      </div>
    </div>
  );
}
