// import GoogleIcon from "@/assets/icons/google_icon.svg";
// import fbIcon from "@/assets/icons/Vector.svg";
// import AppleIcon from "@/assets/icons/Group.svg";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
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
import { toast } from "sonner";
import EyeOpen from "@/assets/icons/eye1.svg"
import EyeClosed from "@/assets/icons/eye2.svg"
import ForgotPasswordDrawer from "@/pages/ForgotPasswordDrawer";

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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const otpRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastOtpSentTime, setLastOtpSentTime] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  useEffect(() => {
    if (!lastOtpSentTime) return;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastOtpSentTime) / 1000);
      const remaining = 30 - elapsed;
      setResendCooldown(remaining > 0 ? remaining : 0);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastOtpSentTime]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 12) return "Good Morning! 🌆";
    if (hour >= 12 && hour < 16) return "Good Afternoon! ✌🏻";
    return "Good Evening! 🌌";
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
    setShowPassword(false);
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setIsVerifying(false);
    setIsSendingOtp(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleXP = (e) => {
      const { reason, amount } = e.detail;
      addXP(reason, amount);
    };
    window.addEventListener("addXP", handleXP);
    return () => window.removeEventListener("addXP", handleXP);
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
      if (otpSent && !otp.trim()) {
        newErrors.otp = "Please enter the OTP.";
      }
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password, firstName, lastName, gender, dob, mode, otpSent, otp]);

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, gender, dob, mode, otpSent, otp, validateForm]);

  const handleToggle = (targetMode) => {
    navigate(`/${targetMode}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    validateForm();
    if (!isFormValid) return;
    if (mode === "register" && !otpVerified) {
      toast.error("Please verify your email with the OTP before registering.");
      return;
    }

const payload =
  mode === "register"
    ? {
        firstName,
        lastName,
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
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const res = await fetch(`${baseUrl}/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Wrong credentials", { duration: 1500, position: "top-center" });
        return;
      }

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));
      localStorage.setItem("loginTimestamp", Date.now());
      localStorage.setItem("userData", JSON.stringify(data.user));
      const userId = data.user.id || data.user._id || data.user.email;
      toast.success("Logging in...", { duration: 2000, position: "top-center" });

      // Give XP only if not already given today, with delay and XP toast
      const today = new Date().toISOString().split("T")[0];
      const lastLoginKey = `lastLoginXP_${userId}`;
      const lastLogin = localStorage.getItem(lastLoginKey);

      if (lastLogin !== today) {
        setTimeout(() => {
          addXP(10, "Daily login");
          localStorage.setItem(lastLoginKey, today);
        }, 1000);
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("❌ Request failed:", err);
    }
  };

  return (
    <AuthWrapper>
      <div className="w-full max-w-md mt-auto mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-left ml-1">
          {getGreeting()}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => handleToggle("login")}
            className={`px-4 py-2 border-b-4 transition-all duration-200 ${mode === "login" ? "border-cyan-700 font-semibold" : "border-transparent"}`}>
            Login
          </button>

          <button
            onClick={() => handleToggle("register")}
            className={`px-4 py-2 border-b-4 transition-all duration-200 ${mode === "register" ? "border-cyan-700 font-semibold" : "border-transparent"}`}>
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
                      <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="w-full">
                    {submitted && errors.lastName && (
                      <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1">{errors.lastName}</div>
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
                      <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1 mt-1">{errors.gender}</div>
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
                      <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1 mt-1">{errors.dob}</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="relative w-full">
            <Input
              placeholder="Email Address"
              className="w-full placeholder:text-zinc-500 pr-28"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {mode === "register" && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !otpSent && (
              <div
                onClick={async () => {
                  setIsSendingOtp(true);
                  try {
                    const baseUrl = import.meta.env.VITE_APP_BASE_URL;

                    // STEP 1: Check if email exists before sending OTP
                    const checkRes = await fetch(`${baseUrl}/api/auth/check-email`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });

                    if (checkRes.status === 409) {
                      toast.error("Email already exists, Try Logging in!");
                      setIsSendingOtp(false);
                      return;
                    }

                    // STEP 2: Send OTP only if email is available
                    const res = await fetch(`${baseUrl}/api/auth/otp/send`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });

                    const data = await res.json();
                    if (res.ok) {
                      toast.success("OTP sent successfully", { duration: 2000 });
                      setOtpSent(true);
                      setLastOtpSentTime(Date.now());
                      setTimeout(() => {
                        otpRef.current?.focus();
                      }, 300);
                    } else {
                      toast.error(data.message || "Failed to send OTP");
                    }
                  } catch (err) {
                    toast.error("Something went wrong");
                    console.error("OTP send error:", err);
                  } finally {
                    setIsSendingOtp(false);
                  }
                }}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-cyan-700 cursor-pointer px-3 py-1 rounded transition-opacity ${
                  isSendingOtp ? "opacity-50 pointer-events-none" : "hover:bg-cyan-100"
                }`}
              >
                {isSendingOtp ? "Sending..." : "Send OTP"}
              </div>
            )}
          </div>
          {submitted && errors.email && (
            <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1">{errors.email}</div>
          )}

          {mode === "register" && (
            <div>
              <div className="flex items-center gap-2">
                {/* OTP Input and Verify button (show only after OTP sent) */}
                {otpSent && (
                  <Input
                    ref={otpRef}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="placeholder:text-zinc-500"
                  />
                )}

                {otpSent && (
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!otp.trim()) return;
                      setIsVerifying(true);
                      try {
                        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
                        const res = await fetch(`${baseUrl}/api/auth/otp/verify`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email, otp }),
                        });
                        const data = await res.json();
                        if (res.ok) {
                          toast.success("Email verified");
                          setOtpVerified(true);
                        } else {
                          toast.error(data.message || "OTP verification failed");
                          setOtpVerified(false);
                        }
                      } catch (err) {
                        console.error("OTP verify error:", err);
                        toast.error("Failed to verify OTP");
                        setOtpVerified(false);
                      } finally {
                        setIsVerifying(false);
                      }
                    }}
                    disabled={isVerifying || otpVerified}
                    className={`transition-all bg-cyan-700 hover:bg-cyan-800 duration-150 ${isVerifying || otpVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isVerifying ? "Verifying..." : otpVerified ? "Verified ✅" : "Verify"}
                  </Button>
                )}
              </div>
              {submitted && errors.otp && (
                <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1 mt-1">{errors.otp}</div>
              )}
              {/* Resend OTP with cooldown */}
              {otpSent && !otpVerified && (
                <div className="text-xs text-zinc-500 mt-2">
                  Didn’t get the code?
                  {resendCooldown > 0 ? (
                    <span className="ml-1 text-cyan-600">{`Resend in ${resendCooldown}s`}</span>
                  ) : (
                    <span
                      className="ml-1 text-cyan-700 cursor-pointer hover:underline"
                      onClick={async () => {
                        if (!email || resendCooldown > 0) return;
                        setIsSendingOtp(true);
                        try {
                          const baseUrl = import.meta.env.VITE_APP_BASE_URL;
                          const res = await fetch(`${baseUrl}/api/auth/otp/send`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            toast.success("OTP resent successfully");
                            setOtpSent(true);
                            setLastOtpSentTime(Date.now());
                            setTimeout(() => {
                              otpRef.current?.focus();
                            }, 300);
                          } else {
                            toast.error(data.message || "Failed to resend OTP");
                          }
                        } catch (err) {
                          console.error("OTP resend error:", err);
                          toast.error("Something went wrong");
                        } finally {
                          setIsSendingOtp(false);
                        }
                      }}
                    >
                      Resend OTP
                    </span>
                  )}
                </div>
              )}
            </div>
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
              <img
                src={showPassword ? EyeClosed : EyeOpen}
                alt={showPassword ? "Hide password" : "Show password"}
                className="h-5 w-5 opacity-60 hover:opacity-100"
              />
            </button>
          </div>
          {mode === "login" && (
            <div className="w-full text-right">
              <ForgotPasswordDrawer />
            </div>
          )}
          {submitted && errors.password && (
            <div className="bg-cyan-100 text-cyan-700 text-xs rounded px-2 py-1">{errors.password}</div>
          )}
          <Button className="bg-cyan-700 hover:bg-cyan-800 w-full" type="submit">Continue</Button>
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