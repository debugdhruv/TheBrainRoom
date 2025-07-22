export default function AvatarCircle({ firstName = "", lastName = "" }) {
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  return (
    <div className="w-44 h-44 rounded-full border border-cyan-700 bg-cyan-100 flex items-center justify-center text-cyan-700 text-6xl font-semibold shadow-md">
      {initials || "👤"}
    </div>
  );
}