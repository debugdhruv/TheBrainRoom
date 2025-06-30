export default function AvatarCircle({ firstName, lastName }) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
      {initials}
    </div>
  );
}