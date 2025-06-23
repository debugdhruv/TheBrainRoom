import { useState } from "react";
import AuthWrapper from "@/components/common/AuthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/assets/icons/google_icon.svg";
import fbIcon from "@/assets/icons/Vector.svg";
import AppleIcon from "@/assets/icons/Group.svg";

export default function AuthPage() {
  const [mode, setMode] = useState("register");

  return (
    <AuthWrapper>
      <div className="w-full max-w-md mt-auto mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-left ml-1">
          Good Morning! <span className="inline-block">👋</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 border-b-2 ${mode === "login" ? "border-black font-semibold" : "border-transparent"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 border-b-2 ${mode === "register" ? "border-black font-semibold" : "border-transparent"
              }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {mode === "register" && (
            <>
              <div className="flex space-x-2">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <div className="flex space-x-2">
                <Input className="w-24" placeholder="Gender" />
                <Input placeholder="Date of Birth" />
              </div>
            </>
          )}

          <Input placeholder="Email Address" />
          <Input placeholder="Create your Password" type="password" />

          <Button className="w-full">Continue →</Button>
        </form>

        {/* Social login */}
        <div className="text-center mt-6 text-sm">
          or Sign up With
          <div className="flex justify-center mt-4 space-x-8">
            <img src={GoogleIcon} alt="Google Login" className="h-15 w-15" />
            <img src={fbIcon} alt="Facebook Login" className="h-15 w-15" />
            <img src={AppleIcon} alt="Apple Login" className="h-15 w-15" />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}