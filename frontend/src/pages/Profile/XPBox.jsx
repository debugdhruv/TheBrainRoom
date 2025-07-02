import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function XPBox({ xp }) {
  const history = [
    { date: "2025-07-01", action: "Daily login", points: 10 },
    { date: "2025-06-30", action: "Followed AI suggestion", points: 50 },
    { date: "2025-06-29", action: "Joined a server", points: 5 },
    { date: "2025-06-28", action: "Referred a friend", points: 100 },
    { date: "2025-06-27", action: "Weekly bonus", points: 20 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* XP Summary Card */}
      <div className="bg-white border rounded-xl shadow-sm px-6 py-5 w-full lg:w-6/12 relative flex flex-col justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="absolute underline top-4 right-4 flex items-center gap-1 text-xs text-purple-700 hover:opacity-80 transition"
            >
              <span>how is XP calculated?</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={12}
            align="end"
            className="w-64 bg-white border rounded-lg shadow-lg p-4"
          >
            <p className="text-sm font-semibold text-zinc-700 mb-2">XP Breakdown</p>
            <ul className="space-y-2 text-sm text-zinc-600">
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

        <div className="text-left sm:text-center flex flex-col justify-center items-start sm:items-center w-full min-h-28 sm:min-h-52 sm:py-4">
          <p className="text-lg font-bold text-zinc-500">Total XP</p>
          <h2 className="text-8xl font-bold text-purple-600">{xp}</h2>
          <p className="text-md font-semibold text-zinc-400 mt-1">earned so far</p>
        </div>
      </div>

      {/* XP History Section */}
      <div className="bg-white border rounded-xl shadow-sm px-6 py-5 w-full lg:w-6/12">
        <h3 className="text-lg font-semibold text-zinc-700 mb-6">XP History</h3>
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
      </div>
    </div>
  );
}