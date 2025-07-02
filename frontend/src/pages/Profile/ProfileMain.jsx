import AvatarCircle from "./AvatarCircle";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import MoodChart from "./MoodChart";
import XPBox from "./XPBox";

export default function ProfileMain() {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
      <div className="relative flex items-center gap-6">
        {/* Avatar */}
        <AvatarCircle firstName={user.firstName} lastName={user.lastName} />

        {/* User Info */}
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="font-medium text-lg text-zinc-400">
            {user.age} , {user.gender}
          </p>
        </div>
        {/* Edit Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>
            Edit Profile
          </Button> 
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal open={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Chart + XP Section */}
      <div className="mt-10 space-y-6">
        <div className="text-left space-y-1">
          <h3 className="text-xl font-semibold text-zinc-800">Mood Timeline</h3>
          <p className="text-sm text-zinc-500">Your emotional trend across the past 7 days.</p>
        </div>
        <MoodChart />
        <XPBox xp={145} />
      </div>
    </div>
  );
}