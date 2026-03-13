interface StreakCardProps {
  label: string;
  value: string | number;
  icon: string;
  highlight?: boolean;
}

export default function StreakCard({
  label,
  value,
  icon,
  highlight = false,
}: StreakCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border ${
        highlight
          ? "bg-indigo-600 text-white border-indigo-700"
          : "bg-white text-gray-800 border-gray-100"
      }`}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span
        className={`text-3xl font-bold ${
          highlight ? "text-white" : "text-indigo-700"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-sm mt-1 font-medium ${
          highlight ? "text-indigo-100" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
