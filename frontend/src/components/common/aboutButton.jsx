import { useLocation } from "react-router-dom";

export default function FloatingAboutButton() {
  const location = useLocation();
  const isActive = location.pathname === "/dashboard/about";

  return (
    <a
      href="/about"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed top-6 sm:top-10 right-10 z-50 px-6 py-3 text-md font-bold rounded-full transition-all duration-300 shadow-md backdrop-blur-md
        ${isActive
          ? "font-bold border border-zinc-200 bg-gradient-to-r from-purple-500 to-slate-900 text-white hover:brightness-110"
          : "text-purple-600 font-bold border border-purple-600"}`}
      title="About The Brain Room"
    >
      Let's Connect
    </a>
  );
}