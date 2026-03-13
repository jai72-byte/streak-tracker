interface HistoryListProps {
  dates: string[];
}

export default function HistoryList({ dates }: HistoryListProps) {
  if (dates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <span className="text-4xl block mb-3">📭</span>
        <p className="text-lg font-medium">No study sessions recorded yet.</p>
        <p className="text-sm mt-1">
          Head to the dashboard and mark your first study session!
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {dates.map((date, idx) => (
        <li key={idx} className="flex items-center gap-4 py-4 px-2">
          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {idx + 1}
          </span>
          <span className="text-gray-700 font-medium">{date}</span>
          {idx === 0 && (
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
              Latest
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
