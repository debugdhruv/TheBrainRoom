// import GoogleIcon from "@/assets/icons/google_icon.svg";
// import fbIcon from "@/assets/icons/Vector.svg";
// import AppleIcon from "@/assets/icons/Group.svg";
import { useState, useEffect, useContext, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import AuthWrapper from "@/components/common/AuthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 16) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    if (location.pathname.includes("register")) setMode("register");
    else setMode("login");

    // Reset form fields when switching modes
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setGender("");
    setDob(null);
    setSubmitted(false);
    setErrors({});
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

  const validateForm = useCallback(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password || !passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters, include one uppercase and one number.";
    }

    if (mode === "register") {
      if (!firstName.trim()) newErrors.firstName = "First name is required.";
      if (!lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!gender) newErrors.gender = "Gender is required.";
      if (!dob) newErrors.dob = "Date of Birth is required.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password, firstName, lastName, gender, dob, mode]);

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, gender, dob, mode, validateForm]);

  const handleToggle = (targetMode) => {
    navigate(`/${targetMode}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    validateForm();
    if (!isFormValid) return;

    const payload =
  mode === "register"
    ? {
        username: `${firstName} ${lastName}`,
        email,
        password,
        gender,
        dob: dob ? dob.toISOString() : null,
      }
    : {
        email,
        password,
      };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/auth/${mode}`, {
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
      localStorage.setItem("loginTimestamp", Date.now());
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
            className={`px-4 py-2 border-b-2 transition-all duration-200 ${mode === "login" ? "border-black font-semibold" : "border-transparent"}`}>
            Login
          </button>

          <button
            onClick={() => handleToggle("register")}
            className={`px-4 py-2 border-b-2 transition-all duration-200 ${mode === "register" ? "border-black font-semibold" : "border-transparent"}`}>
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <div>
                <div className="flex space-x-2">
                  {/* First Name */}
                  <Input
                    placeholder="First Name"
                    className="w-full placeholder:text-zinc-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {/* Last Name */}
                  <Input
                    placeholder="Last Name"
                    className="w-full placeholder:text-zinc-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {/* Error messages for First Name and Last Name */}
                <div className="flex space-x-2 mt-1">
                  <div className="w-full">
                    {submitted && errors.firstName && (
                      <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="w-full">
                    {submitted && errors.lastName && (
                      <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1">{errors.lastName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex space-x-2">
                  {/* Gender block */}
                  <div className="w-full">
                    <Select onValueChange={setGender} value={gender}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    {submitted && errors.gender && (
                      <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1 mt-1">{errors.gender}</div>
                    )}
                  </div>
                  {/* DOB block */}
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-left font-normal text-zinc-500 px-3 bg-white border border-input shadow-sm placeholder:text-zinc-500"
                        >
                          <span
                            className={`text-sm ${dob ? "text-zinc-800" : "text-zinc-500"}`}
                          >
                            {dob ? format(dob, "dd-MM-yyyy") : "Date of Birth"}
                          </span>
                          <img
                            src={CalendarIcon}
                            alt="calendar icon"
                            className={`h-5 w-5 ${dob ? "opacity-100" : "opacity-60"}`}
                          />
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
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    {submitted && errors.dob && (
                      <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1 mt-1">{errors.dob}</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <Input
            placeholder="Email Address"
            className="w-full placeholder:text-zinc-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitted && errors.email && (
            <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1">{errors.email}</div>
          )}

          {/* Password Field */}
          <div className="relative">
            <Input
              placeholder="Create your Password"
              className="w-full pr-16 placeholder:text-zinc-500"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-600 hover:text-zinc-800 transition-colors duration-200"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {submitted && errors.password && (
            <div className="bg-red-100 text-red-700 text-xs rounded px-2 py-1">{errors.password}</div>
          )}

          <Button className="w-full" type="submit">Continue →</Button>
        </form>

        {/* Social login */}
        {/* <div className="text-center mt-6 text-sm">
          or Sign up With
          <div className="flex justify-center mt-4 space-x-8">
            <img src={GoogleIcon} alt="Google Login" className="h-15 w-15" />
            <img src={fbIcon} alt="Facebook Login" className="h-15 w-15" />
            <img src={AppleIcon} alt="Apple Login" className="h-15 w-15" />
          </div>
        </div> */}
      </div>
    </AuthWrapper>
  );
}