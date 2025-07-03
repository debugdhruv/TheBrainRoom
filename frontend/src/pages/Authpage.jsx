import { useState, useEffect, useContext } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import AuthWrapper from "@/components/common/AuthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/assets/icons/google_icon.svg";
import fbIcon from "@/assets/icons/Vector.svg";
import AppleIcon from "@/assets/icons/Group.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { XPContext } from "@/context/XPContext";
import CalendarIcon from "@/assets/icons/calendar.svg"

export default function AuthPage({ mode: initialMode }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const { addXP } = useContext(XPContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 16) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    if (location.pathname.includes("register")) setMode("register");
    else setMode("login");
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      const lastLogin = localStorage.getItem("lastLoginXP");

      if (lastLogin !== today) {
        addXP("Daily login", 10);
        localStorage.setItem("lastLoginXP", today);
      }
    }
  }, [addXP]);

  const handleToggle = (targetMode) => {
    navigate(`/${targetMode}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      mode === "register"
        ? {
            username: `${firstName} ${lastName}`,
            email,
            password,
            gender,
          }
        : {
            email,
            password,
          };

    try {
      const res = await fetch(`http://localhost:5050/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error:", data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      console.log("✅ Success:", data);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Request failed:", err);
    }
  };

  return (
    <AuthWrapper>
      <div className="w-full max-w-md mt-auto mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-left ml-1">
          {getGreeting()}! <span className="inline-block">👋</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => handleToggle("login")}
            className={`px-4 py-2 border-b-2 ${mode === "login" ? "border-black font-semibold" : "border-transparent"}`}>
            Login
          </button>

          <button
            onClick={() => handleToggle("register")}
            className={`px-4 py-2 border-b-2 ${mode === "register" ? "border-black font-semibold" : "border-transparent"}`}>
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <div className="flex space-x-2">
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="flex space-x-2">
                {/* Gender Select */}
                <Select onValueChange={setGender}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="opacity-60 hover:opacity-100 transition-opacity w-full justify-between text-left font-normal text-zinc-800 px-3">
                      <span>{dob ? format(dob, "dd-MM-yyyy") : "Date of Birth"}</span>
                      <img
                        src={CalendarIcon}
                        alt="calendar icon"
                        className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto max-h-[300px] overflow-y-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dob}
                      onSelect={setDob}
                      captionLayout="dropdown"
                      dropdownCaption={true}
                      fromYear={1950}
                      toYear={new Date().getFullYear()} />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Create your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button className="w-full" type="submit">Continue →</Button>
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