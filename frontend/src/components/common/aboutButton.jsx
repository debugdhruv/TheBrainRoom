import { useLocation } from "react-router-dom";

export default function FloatingAboutButton() {
  const location = useLocation();
  const isActive = location.pathname === "/dashboard/about";

  return (
    <a
      href="/about"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed opacity-0 sm:opacity-100 top-6 sm:top-10 right-10 z-50 px-4 py-2 text-sm sm:px-4 sm:py-3 sm:text-md font-bold rounded-full transition-all duration-300 shadow-md backdrop-blur-md
        ${isActive
          ? "font-bold border border-zinc-200 bg-gradient-to-r from-cyan-500 to-slate-900 text-white hover:brightness-110"
          : "text-cyan-600 font-bold border border-cyan-600"}`}
      title="About The Brain Room"
    >
      Let's Connect
    </a>
  );
}