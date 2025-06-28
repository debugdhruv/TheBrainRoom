import { useNavigate } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@/assets/darklogo.png";

import HomeIcon from "@/assets/icons/home 1.svg";
import HomeIconFilled from "@/assets/icons/home 2.svg";

import MoodIcon from "@/assets/icons/mood 1.svg";
import MoodIconFilled from "@/assets/icons/mood 2.svg";

import BotIcon from "@/assets/icons/chat 1.svg";
import BotIconFilled from "@/assets/icons/chat 2.svg";

import ForumIcon from "@/assets/icons/forum 1.svg";
import ForumIconFilled from "@/assets/icons/forum 2.svg";

import ProfileIcon from "@/assets/icons/profile 1.svg";
import ProfileIconFilled from "@/assets/icons/profile 2.svg";

import DiamondIcon from "@/assets/icons/diamond 1.svg";
import DiamondIconFilled from "@/assets/icons/diamond 2.svg";

import LogoutIcon from "@/assets/icons/logout 1.svg";

export default function Sidebar() {
  const location = useLocation();
  const isPremiumActive = location.pathname === "/dashboard/premium";
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: HomeIcon,
      iconActive: HomeIconFilled,
    },
    {
      name: "Mood Check",
      path: "/dashboard/mood",
      icon: MoodIcon,
      iconActive: MoodIconFilled,
    },
    {
      name: "Brain Bot",
      path: "/dashboard/bot",
      icon: BotIcon,
      iconActive: BotIconFilled,
    },
    {
      name: "Forums",
      path: "/dashboard/forums",
      icon: ForumIcon,
      iconActive: ForumIconFilled,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: ProfileIcon,
      iconActive: ProfileIconFilled,
    },
  ];

  return (
    <div className="h-screen w-[300px] bg-white border-r flex flex-col justify-between px-8 py-6 text-[17px]">
      <div>
        <div className="mb-8">
          <a href="/dashboard" className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="h-14 w-14" />
            <h1 className="font-semibold italic text-lg">The Brain Room</h1>
          </a>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map(({ name, path, icon, iconActive }) => {
            const isActive = path === "/dashboard"
              ? location.pathname === path
              : location.pathname.startsWith(path);
            return (
              <NavLink
                key={name}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive
                  ? "bg-zinc-200 text-black font-semibold"
                  : "text-zinc-500 hover:bg-zinc-50"
                  }`}
              >
                <img src={isActive ? iconActive : icon} alt={name} className="h-5 w-5" />
                {name}
              </NavLink>
            );
          })}
        </nav>
        <NavLink
          to="/dashboard/premium"
          className={`mt-10 flex items-center justify-center gap-2 px-4 py-2 rounded-md w-full transition-all 
    ${isPremiumActive
              ? "font-semibold border border-zinc-200 bg-gradient-to-r from-purple-500 to-slate-900 text-white hover:brightness-110"
              : "bg-purple-100 text-purple-800 font-semibold border border-purple-300"
            }`}
        >
          <img
            src={isPremiumActive ? DiamondIconFilled : DiamondIcon}
            alt="Premium"
            className="h-5 w-5"
          />
          The Brain Room+
        </NavLink>
      </div>

      <div className="text-sm space-y-10">
        <div>
          <p className="text-zinc-400">Reach out to me:</p>
          <a href="mailto:dhruvtiwari.1130@gmail.com" className="underline">
            dhruvtiwari.1130@gmail.com
          </a>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-base"
          >
            <img src={LogoutIcon} alt="Logout" className="h-5 w-5" />
            Logout
          </button>
          <a href="https://github.com/debugdhruv/The-Brain-Room" target="blank" className="text-zinc-500 underline text-xs">
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}