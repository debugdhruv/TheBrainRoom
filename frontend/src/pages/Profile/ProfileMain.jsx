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
import { useXP } from "@/context/useXP";

export default function ProfileMain() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [range, setRange] = useState("7d");
  const [copied, setCopied] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const { addXP } = useXP();
  const { xp, history } = useXP();

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
                          addXP(100, "referring a friend");
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
                          addXP(100, "referring a friend");
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
        <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
          {/* XP Summary Card */}
          <div className="bg-white border rounded-xl shadow-sm px-6 py-5 w-full lg:w-6/12 relative flex flex-col justify-center items-center h-full">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="absolute underline top-4 right-4 flex items-center gap-1 text-sm text-purple-700 hover:opacity-80 transition"
                >
                  <span>how is XP calculated?</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={12}
                align="start"
                className="w-96 bg-white border rounded-lg shadow-lg p-6"
              >
                <p className="text-lg font-semibold text-zinc-700 mb-2">XP Breakdown</p>
                <ul className="space-y-2 text-md text-zinc-600">
                  <li className="flex justify-between">
                    <span>Daily login</span>
                    <span className="text-purple-700 font-medium">+10 XP</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Follow AI suggestion</span>
                    <span className="text-purple-700 font-medium">+50 XP</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Join a server</span>
                    <span className="text-purple-700 font-medium">+5 XP</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Refer a friend</span>
                    <span className="text-purple-700 font-medium">+100 XP</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Weekly bonus</span>
                    <span className="text-purple-700 font-medium">+20 XP</span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            <div className="text-left sm:text-center flex flex-col justify-center items-start sm:items-center w-full min-h-28 sm:min-h-36 sm:py-2">
              <p className="text-lg font-bold text-zinc-500">Total XP</p>
              <h2 className="text-7xl font-bold text-purple-600">{xp}</h2>
              <p className="text-md font-semibold text-zinc-400 mt-1">earned so far</p>
            </div>
          </div>

          {/* XP History Section */}
          <div className="bg-white border rounded-xl shadow-sm px-6 py-5 w-full lg:w-6/12">
            <h3 className="text-lg font-semibold text-zinc-700 mb-6">XP History</h3>
            <div className={`transition-all duration-300 ${showFullHistory ? "" : "max-h-60 overflow-hidden"}`}>
              {history.length === 0 ? (
                <div className="text-center text-zinc-400 text-sm py-6">
                  Please use The Brain Room more to get points.
                </div>
              ) : (
                <ul className="space-y-3 text-sm text-zinc-600">
                  {history.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b pb-2 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-xs text-zinc-400">{item.date}</p>
                      </div>
                      <span className="text-purple-700 font-semibold">+{item.points} XP</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {history.length > 5 && (
              <button
                onClick={() => setShowFullHistory(!showFullHistory)}
                className="text-purple-600 text-sm font-medium mt-2 hover:underline"
              >
                {showFullHistory ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}