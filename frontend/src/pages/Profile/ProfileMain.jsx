import AvatarCircle from "./AvatarCircle";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import MoodChart from "./MoodChart";
import XPBox from "./XPBox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShareIcon from "@/assets/icons/share.svg"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function ProfileMain() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [range, setRange] = useState("7d");
  const [copied, setCopied] = useState(false);

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
          <div className="w-full flex justify-between items-start sm:items-center">
            <div className="relative w-full">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-800">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="font-medium text-lg text-zinc-400">
                    {user.age} , {user.gender}
                  </p>
                </div>

                {/* Desktop Share Button beside name */}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="hidden sm:flex items-center ml-6 w-10 h-10 rounded-full border p-2 hover:bg-zinc-200 transition cursor-pointer">
                      <img className="w-6 h-6" src={ShareIcon} alt="share_btn" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm font-semibold mb-2">Share Brain Room with your friends!! 🪐</p>
                    <div className="flex items-center space-x-2">
                      <Input className="flex-1" value="https://thebrainroom.vercel.app" readOnly />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText("https://thebrainroom.vercel.app");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}>
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Mobile Share Button floating to right */}
              <div className="absolute top-0 right-0 sm:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center w-10 h-10 rounded-full border p-2 hover:bg-zinc-200 transition cursor-pointer">
                      <img className="w-6 h-6" src={ShareIcon} alt="share_btn" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm font-semibold mb-2">Share Brain Room with your friends!! 🪐</p>
                    <div className="flex items-center space-x-2">
                      <Input className="flex-1" value="https://thebrainroom.vercel.app" readOnly />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText("https://thebrainroom.vercel.app");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}>
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
        <XPBox xp={185} />
      </div>
    </div>
  );
}