import type { Job, InterestLevel } from "../../types/kanban";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const interestConfig: Record<
  InterestLevel,
  { label: string; badgeClass: string; borderClass: string }
> = {
  dream: {
    label: "⭐ Dream",
    badgeClass: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    borderClass: "border-l-yellow-400",
  },
  excited: {
    label: "🔥 Excited",
    badgeClass: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    borderClass: "border-l-orange-400",
  },
  neutral: {
    label: "😐 Neutral",
    badgeClass: "bg-slate-50 text-slate-500 ring-1 ring-slate-200",
    borderClass: "border-l-slate-300",
  },
  backup: {
    label: "🪂 Backup",
    badgeClass: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
    borderClass: "border-l-blue-400",
  },
};

export default function JobCard({ job, onClick }: JobCardProps) {
  const { label, badgeClass, borderClass } = interestConfig[job.interestLevel];

  const formattedDate = job.appliedDate
    ? new Date(job.appliedDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      onClick={() => onClick(job)}
      className={`group bg-white rounded-xl border border-slate-200 border-l-4 ${borderClass} p-3.5 cursor-pointer hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-150 space-y-2.5`}
    >
      <div>
        <div className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
          {job.title}
        </div>
        <div className="text-xs text-slate-400 mt-0.5 font-medium">
          {job.company}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}
        >
          {label}
        </span>
        {formattedDate && (
          <span className="text-xs text-slate-400">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}
