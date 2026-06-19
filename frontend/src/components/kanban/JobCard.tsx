import type { Job, InterestLevel } from "../../types/kanban";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const interestBadge: Record<
  InterestLevel,
  { label: string; className: string }
> = {
  dream: { label: "⭐ Dream", className: "bg-yellow-100 text-yellow-800" },
  excited: { label: "🔥 Excited", className: "bg-orange-100 text-orange-800" },
  neutral: { label: "😐 Neutral", className: "bg-gray-100 text-gray-600" },
  backup: { label: "🪂 Backup", className: "bg-blue-100 text-blue-700" },
};

export default function JobCard({ job, onClick }: JobCardProps) {
  const badge = interestBadge[job.interestLevel];

  const formattedDate = new Date(job.appliedDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => onClick(job)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all space-y-2"
    >
      <div className="text-sm font-semibold text-gray-800 leading-tight">
        {job.title}
      </div>
      <div className="text-xs text-gray-500">{job.company}</div>

      <span
        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}
      >
        {badge.label}
      </span>

      <div className="text-xs text-gray-400 pt-1">Applied: {formattedDate}</div>
    </div>
  );
}
