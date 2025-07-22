import Logo from "@/assets/lightlogo.png";
import DarkLogo from "@/assets/darklogo.png";

export default function AuthWrapper({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">

      {/* Left branding panel */}
      <div className="hidden md:grid md:w-1.5/6 bg-gradient-to-b from-zinc-900 to-cyan-600 text-white p-12 rounded-none md:rounded-r-3xl grid-cols-1 justify-left space-y-0 space-x-0">
        <h1 className="text-3xl font-semibold items-left space-x-0">
          <span><img src={Logo} alt="The Brain Room" className="h-24" /></span>
          <span>The Brain Room</span>
        </h1>
        <ul className="items-left space-y-8 text-m">
          <li>
            <strong className="text-2xl">Track What You Feel</strong><br />
            Get daily clarity with 5 sliders for anger,<br />sadness & anxiety.
          </li>
          <li>
            <strong className="text-2xl">Personalized Healing</strong><br />
            Receive calming exercises & journal prompts<br />tailored to your mood.
          </li>
          <li>
            <strong className="text-2xl">Talk Without Judgment</strong><br />
            Chat privately with AI designed to listen, not judge.
          </li>
          <li>
            <strong className="text-2xl">Grow. Earn. Unlock.</strong><br />
            Earn points by caring for yourself & unlock<br />exclusive workshops.
          </li>
        </ul>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-5/6 flex flex-1 flex-col md:justify-center px-6 py-8 md:p-12">
        {/* Mobile Branding */}
        <div className="md:hidden flex flex-col items-center mb-4">
          <img src={DarkLogo} alt="The Brain Room" className="h-16 mb-2" />
          <h1 className="text-2xl font-bold text-center text-zinc-800">The Brain Room</h1>
        </div>

        {/* Spacer to push form to bottom on mobile */}
        <div className="md:hidden flex-1" />

        {/* Form */}
        <div className="w-full max-w-md mx-auto mb-16">{children}</div>
      </div>
    </div>
  );
}