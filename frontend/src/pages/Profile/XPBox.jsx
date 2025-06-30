export default function XPBox({ xp }) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center">
      <p className="text-sm text-zinc-500">Total XP</p>
      <h2 className="text-4xl font-bold text-purple-600 mt-1">{xp}</h2>
      <p className="text-xs text-zinc-400 mt-1">earned so far</p>
    </div>
  );
}