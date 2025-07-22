import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import AboutButton from "@/components/common/aboutButton";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AboutButton />
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="block md:hidden">
        <SidebarMobile />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 ml-[60px] md:ml-0">
        <Outlet />
      </div>
    </div>
  );
}