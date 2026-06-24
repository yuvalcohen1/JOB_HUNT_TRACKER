interface Props {
  jobCount: number;
  onAddJob: () => void;
  onLogout: () => void;
}

export default function BoardHeader({ jobCount, onAddJob, onLogout }: Props) {
  return (
    <header className="flex-none flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">
          🗂
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">
            Job Search Board
          </h1>
          <p className="text-xs text-slate-400">
            {jobCount} {jobCount === 1 ? "position" : "positions"} tracked
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onAddJob}
          className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm shadow-indigo-200"
        >
          <span className="text-base leading-none">+</span>
          Add Job
        </button>
        <button
          onClick={onLogout}
          className="cursor-pointer text-sm font-medium text-slate-400 hover:text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
