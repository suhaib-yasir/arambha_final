export default function DashboardCard({
  icon,
  title,
  value,
  gradient="from-blue-600 to-indigo-500"
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient}
      p-8 text-white shadow-xl min-h-[230px] transition-transform hover:scale-[1.02]`}
    >

      {/* Decorative circles */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10"></div>
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/5"></div>

      <div className="flex justify-between items-start mb-10">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm">
          {icon}
        </div>

        <button className="font-medium text-lg">
          View →
        </button>
      </div>

      <h2 className="text-6xl font-bold mb-2">
        {value}
      </h2>

      <p className="uppercase tracking-wider font-semibold text-sm">
        {title}
      </p>

    </div>
  );
}