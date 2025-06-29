import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "@/assets/darklogo.png";
import MenuIcon from "@/assets/icons/menu.svg";

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

export default function SidebarMobile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/dashboard", icon: HomeIcon, iconActive: HomeIconFilled },
    { name: "Mood Check", path: "/dashboard/mood", icon: MoodIcon, iconActive: MoodIconFilled },
    { name: "Brain Bot", path: "/dashboard/bot", icon: BotIcon, iconActive: BotIconFilled },
    { name: "Forums", path: "/dashboard/forums", icon: ForumIcon, iconActive: ForumIconFilled },
    { name: "Profile", path: "/dashboard/profile", icon: ProfileIcon, iconActive: ProfileIconFilled },
  ];

  const isActive = (path) => 
  path === "/dashboard"
    ? location.pathname === path
    : location.pathname.startsWith(path);

  return (
    <>
      {/* Collapsed Sidebar (Default) */}
      <div className="fixed top-0 left-0 h-screen w-[60px] bg-white border-r z-30 flex flex-col py-4 items-center md:hidden">
        <div className="flex-1 flex flex-col items-center gap-6 overflow-y-auto">
          <img
            src={MenuIcon}
            alt="Menu"
            onClick={() => setIsExpanded(true)}
            className="h-6 w-6 cursor-pointer mb-6"
          />

          {navItems.map(({ name, path, icon, iconActive }) => (
            <NavLink
              key={name}
              to={path}
              className={`p-2 rounded-md ${isActive(path) ? "bg-zinc-200" : ""}`}
            >
              <img
                src={isActive(path) ? iconActive : icon}
                alt={name}
                className="h-5 w-5"
              />
            </NavLink>
          ))}

          <NavLink
            to="/dashboard/premium"
            className={`p-2 rounded-md ${
              location.pathname === "/dashboard/premium"
                ? "font-semibold border border-zinc-200 bg-gradient-to-r from-purple-500 to-slate-900 text-white hover:brightness-110"
                : "bg-purple-100 text-purple-800 font-semibold border border-purple-300"
            }`}
          >
            <img
              src={location.pathname === "/dashboard/premium" ? DiamondIconFilled : DiamondIcon}
              alt="Premium"
              className="h-5 w-5"
            />
          </NavLink>
        </div>

        <div className="flex flex-col items-center gap-4 pb-20">
          <button onClick={() => navigate("/login")} className="p-2 rounded-md hover:bg-zinc-100">
            <img src={LogoutIcon} alt="Logout" className="h-5 w-5" />
          </button>
          <img src={Logo} alt="Brain Room" className="h-6 w-6" />
        </div>
      </div>

      {/* Expanded Sidebar (Always Rendered + Transitions) */}
      <div
        className={`fixed top-0 left-0 h-full max-h-screen w-[65vw] bg-white border-r z-40 px-6 py-6 shadow-md md:hidden flex flex-col justify-between transition-transform duration-500 ease-in-out ${
          isExpanded ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* TOP: Close + Nav */}
          <div className="flex flex-col gap-6">
            <img
              src={MenuIcon}
              alt="Close Sidebar"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 cursor-pointer mb-4"
            />

            {/* Nav Items */}
            <nav className="flex flex-col gap-4">
              {navItems.map(({ name, path, icon, iconActive }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                    isActive(path) ? "bg-zinc-200 font-semibold text-black" : "text-zinc-500"
                  }`}
                >
                  <img src={isActive(path) ? iconActive : icon} alt={name} className="h-5 w-5" />
                  {name}
                </NavLink>
              ))}

              <NavLink
                to="/dashboard/premium"
                onClick={() => setIsExpanded(false)}
                className={`flex items-center gap-3 px-4 py-2 mt-4 rounded-md ${
                  location.pathname === "/dashboard/premium"
                    ? "border-zinc-200 bg-gradient-to-r from-purple-500 to-slate-900 font-bold text-white hover:brightness-110"
                    : "bg-purple-100 text-purple-800 font-semibold border border-purple-300"
                }`}
              >
                <img
                  src={
                    location.pathname === "/dashboard/premium"
                      ? DiamondIconFilled
                      : DiamondIcon
                  }
                  alt="Premium"
                  className="h-5 w-5"
                />
                The Brain Room+
              </NavLink>
            </nav>
          </div>

          {/* BOTTOM: Footer Content */}
          <div className="space-y-6 text-sm pb-8">
            <div>
              <p className="text-zinc-400">Reach out to me:</p>
              <a href="mailto:dhruvtiwari.1130@gmail.com" className="underline">
                dhruvtiwari.1130@gmail.com
              </a>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-base"
            >
              <img src={LogoutIcon} alt="Logout" className="h-5 w-5" />
              Logout
            </button>

            <div className="flex items-center gap-3 pt-6 border-t">
              <img src={Logo} alt="logo" className="h-8 w-8" />
              <h1 className="font-semibold italic text-lg">The Brain Room</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Blur Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-500 ${
          isExpanded ? "bg-black/20 backdrop-blur-sm" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsExpanded(false)}
      />
    </>
  );
}