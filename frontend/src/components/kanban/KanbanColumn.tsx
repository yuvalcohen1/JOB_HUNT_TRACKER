import type { Job, Status } from "../../types/kanban";
import JobCard from "./JobCard";

interface KanbanColumnProps {
  column: Status;
  jobs: Job[];
  onCardClick: (job: Job) => void;
}

const columnConfig: Record<
  Status,
  { label: string; accent: string; dot: string; countClass: string }
> = {
  considering: {
    label: "Considering",
    accent: "border-t-violet-400",
    dot: "bg-violet-400",
    countClass: "bg-violet-100 text-violet-700",
  },
  applied: {
    label: "Applied",
    accent: "border-t-blue-400",
    dot: "bg-blue-400",
    countClass: "bg-blue-100 text-blue-700",
  },
  initial_interview: {
    label: "Initial Interview",
    accent: "border-t-amber-400",
    dot: "bg-amber-400",
    countClass: "bg-amber-100 text-amber-700",
  },
  advanced_interview: {
    label: "Advanced Interview",
    accent: "border-t-orange-400",
    dot: "bg-orange-400",
    countClass: "bg-orange-100 text-orange-700",
  },
  offer: {
    label: "Offer 🎉",
    accent: "border-t-emerald-400",
    dot: "bg-emerald-400",
    countClass: "bg-emerald-100 text-emerald-700",
  },
  rejected: {
    label: "Rejected",
    accent: "border-t-rose-400",
    dot: "bg-rose-400",
    countClass: "bg-rose-100 text-rose-700",
  },
};

export default function KanbanColumn({
  column,
  jobs,
  onCardClick,
}: KanbanColumnProps) {
  const { label, accent, dot, countClass } = columnConfig[column];

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border border-slate-200 border-t-4 ${accent} shadow-sm w-64 shrink-0 max-h-full`}
      style={{ height: "calc(100vh - 132px)" }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${countClass}`}
        >
          {jobs.length}
        </span>
      </div>

      {/* Cards scroll area */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto p-3">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8 gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 text-lg">
              +
            </div>
            <p className="text-xs text-slate-400 text-center">
              No jobs here yet
            </p>
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
