import AvatarCircle from "./AvatarCircle";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import MoodChart from "./MoodChart";
import XPBox from "./XPBox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileMain() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [range, setRange] = useState("7d");

  // Dummy user data — to be replaced with real user state later
  const user = {
    firstName: "Dhruv",
    lastName: "Tiwari",
    age: 22,
    gender: "Male",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <AvatarCircle firstName={user.firstName} lastName={user.lastName} />

        {/* User Info & Button wrapper */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <div>
            <h2 className="text-3xl font-bold text-zinc-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="font-medium text-lg text-zinc-400">
              {user.age} , {user.gender}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-auto">
            <Button className="border border-purple-700 hover:bg-purple-700 hover:text-white font-semibold rounded-lg text-purple-700" variant="outline" onClick={() => setIsEditOpen(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal open={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Chart + XP Section */}
      <div className="mt-10 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-zinc-800">Mood Timeline</h3>
            <p className="text-sm text-zinc-500">
              Your emotional trend across the past {range === "30d" ? "30 days" : "7 days"}.
            </p>
          </div>
          <Tabs value={range} onValueChange={setRange}>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <MoodChart range={range} />
          </div>
        </div>
        <div className="w-full">
          <XPBox xp={145} />
        </div>
      </div>
    </div>
  );
}