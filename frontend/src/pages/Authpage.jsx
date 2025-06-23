import { useState } from "react";
import AuthWrapper from "@/components/common/AuthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const [mode, setMode] = useState("register");

  return (
    <AuthWrapper>
      <div className="w-full max-w-md">
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
                <Input placeholder="Gender" />
                <Input placeholder="Date of Birth" />
              </div>
            </>
          )}

          <Input placeholder="Email Address" />
          <Input placeholder="Create your Password" type="password" />

          <Button className="w-full">Continue →</Button>
        </form>

        {/* Social login */}
        <div className="text-center mt-4 text-sm">
          or Sign up With
          <div className="flex justify-center mt-2 space-x-4">
            <img src="/icons/facebook.svg" className="w-5" />
            <img src="/icons/google.svg" className="w-5" />
            <img src="/icons/apple.svg" className="w-5" />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}