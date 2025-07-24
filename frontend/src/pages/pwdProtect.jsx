import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BackIcon from "@/assets/icons/back.svg"
import EyeOpen from "@/assets/icons/eye1.svg";
import EyeClosed from "@/assets/icons/eye2.svg";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/darklogo.png";

export default function PwdProtect() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/get-protected-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Access granted! Opening Github`);
        setTimeout(() => {
          window.open(data.url, "_blank");
          setLoading(false);
        }, 1000);
      } else {
        toast.error(data.message || "Wrong password. Access denied.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/about");
  }

  return (
    <div>
      <div className="fixed left-6 top-10 sm:left-28 sm:top-16 justify-start">
        <button
          onClick={handleBack}
          className="flex items-center bg-cyan-50 text-cyan-600 font-bold text-md border border-cyan-200 pr-5 pl-4 py-2 rounded-full hover:bg-cyan-200  disabled:opacity-30"
        >
          <img src={BackIcon} alt="Back" className="h-4 w-4" /> Go Back
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center">
            Protected Link Access
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Enter the password to continue to the secure link.
          </p>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-600 hover:text-zinc-800 transition-colors duration-200"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src={showPassword ? EyeClosed : EyeOpen}
                alt={showPassword ? "Hide password" : "Show password"}
                className="h-5 w-5 opacity-60 hover:opacity-100"
              />
            </button>
          </div>
          <Button className="w-full bg-cyan-700 hover:bg-cyan-800" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Unlock Link"}
          </Button>
        </form>
        <div className="mt-8 max-w-md mx-auto text-left px-4 py-3 bg-cyan-50 border border-cyan-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-cyan-800 mb-1">🔐 Why is this link protected?</h2>
          <p className="text-sm text-justify text-cyan-700">
            The source code of this project is protected to prevent it from being copied.
            If you're genuinely interested in exploring the repository, feel free to DM me on WhatsApp:{" "}
            <a
              href="https://wa.me/917974914363"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-cyan-900 transition-colors duration-200">
              +91-7974914363
            </a>
          </p>
        </div>
        <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center space-y-2 mb-2">
          <img src={logo} alt="The Brain Room Logo" className="h-20 w-20" />
          <h1 className="font-semibold text-lg text-center">The Brain Room</h1>
        </footer>
      </div>
    </div>
  );
}