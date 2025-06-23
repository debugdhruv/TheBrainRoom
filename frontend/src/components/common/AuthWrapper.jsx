export default function AuthWrapper({ children }) {
  return (
    <div className="flex h-screen w-full">
      {/* Left branding panel */}
      <div className="w-1/2 bg-gradient-to-b from-zinc-900 to-purple-600 text-white p-10 rounded-r-3xl flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-semibold flex items-center space-x-2">
          <span>🧠</span>
          <span>The Brain Room</span>
        </h1>
        <ul className="space-y-4 text-sm">
          <li>
            <strong>→ Track What You Feel</strong><br />
            Get daily clarity with 5 sliders for anger, fear, joy, sadness & anxiety.
          </li>
          <li>
            <strong>→ Personalized Healing</strong><br />
            Receive calming exercises & journal prompts tailored to your mood.
          </li>
          <li>
            <strong>→ Talk Without Judgment</strong><br />
            Chat privately with AI designed to listen, not judge.
          </li>
          <li>
            <strong>→ Grow. Earn. Unlock.</strong><br />
            Earn points by caring for yourself & unlock exclusive workshops.
          </li>
        </ul>
      </div>

      {/* Right form panel */}
      <div className="w-1/2 flex items-center justify-center">{children}</div>
    </div>
  );
}
