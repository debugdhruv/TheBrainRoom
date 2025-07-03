import linky from "@/assets/icons/linky.svg"
import { useXP } from "@/context/useXP";

const forumServers = [
  {
    name: "The Vent",
    members: "17K+",
    invite: "https://discord.com/invite/vent",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Mental Health Support",
    members: "14.7K+",
    invite: "https://discord.com/invite/mhsc",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Fight Through Mental Health",
    members: "17.9K+",
    invite: "https://discord.com/invite/ftmh",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Anxiety & Depression Support",
    members: "19.2K+",
    invite: "https://discord.gg/gpksXdgNEp",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "The Therapy Center",
    members: "21K+",
    invite: "https://discord.com/invite/xjVfFdkxKa",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "snuggle",
    members: "9K+",
    invite: "https://discord.com/invite/nfXrTY4V8R",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Estelle",
    members: "11K+",
    invite: "https://discord.com/invite/Y8McfXjGKH",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Ups & Downs",
    members: "4K+",
    invite: "https://discord.com/invite/m7zJ2SWW3W",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Stellar Mind",
    members: "20+",
    invite: "https://discord.com/invite/4d7vFVuRc4",
    image: "https://placehold.co/400x200?text=The+Server",
  },
  {
    name: "Deep Fix",
    members: "55+",
    invite: "https://discord.com/invite/HXmp5ukR5z",
    image: "https://placehold.co/400x200?text=The+Server",
  },
];

export default function Forums() {
  const { addXP } = useXP();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-6">Community Forums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {forumServers.map((server, idx) => (
          <div key={idx} className="relative bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden">
            {/* Link icon with enhanced blur and contrast */}
            <div className="absolute top-2 right-2">
              <img className="w-5 h-5 shadow-xl rounded-full" src={linky} alt="redirect" />
            </div>
            {/* Thumbnail */}
            <img
              src={server.image}
              alt={`${server.name} logo`}
              className="w-full h-32 sm:h-40 object-cover" />

            {/* Card content */}
            <div className="p-4 flex flex-col items-center space-y-2">
              <h3 className="text-center font-semibold text-lg text-zinc-800">{server.name}</h3>
              <p className="text-xs text-zinc-500">{server.members} members</p>
              {server.tagline && (
                <p className="text-center text-xs text-zinc-600">{server.tagline}</p>
              )}

              <button
                onClick={() => {
                  addXP(5, "Joined a server");
                  setTimeout(() => {
                    window.open(server.invite, "_blank", "noopener,noreferrer");
                  }, 1000);
                }}
                className="mt-3 w-full bg-purple-600 text-white text-sm font-medium rounded-full py-2 text-center hover:opacity-70 transition">
                Join Server
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
