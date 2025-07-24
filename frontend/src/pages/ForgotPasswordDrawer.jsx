import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import EyeOpen from "@/assets/icons/eye1.svg"
import EyeClosed from "@/assets/icons/eye2.svg"

export default function ForgotPasswordDrawer() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [passwordError, setPasswordError] = useState("");

  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleEmailSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`OTP sent to ${email}`);
      setStep(2);
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpComplete = async (val) => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: val }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  const handlePasswordChange = async () => {
    if (!email || !otp || !newPassword) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Password changed successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      document.activeElement?.blur(); // Dismiss keyboard if on mobile
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    await handleEmailSubmit(); // reuse the send OTP logic
    setResendCooldown(30); // start cooldown
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-sm text-cyan-700 underline">Forgot Password?</button>
      </DrawerTrigger>

      <DrawerContent className="p-6 min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4 shadow-none border-none">
        <h2 className="text-2xl font-semibold">
          {step === 1 && "Enter your registered Email"}
          {step === 2 && "Enter the OTP we sent to your Email"}
          {step === 3 && "Set your new password"}
        </h2>

        {step === 1 && (
          <>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm"
            />
            <Button
              className="w-full max-w-sm"
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Verify Email"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                if (val.length === 4) {
                  handleOtpComplete(val);
                }
              }}
              className="w-full max-w-sm"
            >
              <InputOTPGroup className="">
                {[...Array(4)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="h-14 w-14 text-xl" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <div className="text-sm text-muted-foreground mt-2">
              Didn’t get the OTP?{" "}
              <button
                onClick={handleResendOtp}
                className={`underline transition-opacity duration-200 ${
                  resendCooldown > 0 ? "text-cyan-700 opacity-50 cursor-not-allowed" : "text-cyan-700"
                }`}
                disabled={resendCooldown > 0}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="relative w-full max-w-sm">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewPassword(val);

                  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
                  if (!passwordRegex.test(val)) {
                    setPasswordError("Password must be at least 8 characters, include one uppercase and one number.");
                  } else {
                    setPasswordError("");
                  }
                }}
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                  src={showPassword ? EyeClosed : EyeOpen}
                  alt="Toggle Password"
                  className="h-5 w-5 opacity-60 hover:opacity-100"
                />
              </button>
            </div>

            {passwordError && (
              <p className="text-xs text-red-500 mt-1 text-left w-full max-w-sm">
                {passwordError}
              </p>
            )}

            <DrawerClose asChild>
              <Button
                className="w-full max-w-sm mt-2"
                disabled={isSubmitting || !newPassword || !!passwordError}
                onClick={handlePasswordChange}
              >
                {isSubmitting ? "Setting..." : "Set New Password"}
              </Button>
            </DrawerClose>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}