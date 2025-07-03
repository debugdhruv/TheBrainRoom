import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Authpage";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/MoodCheck/MoodCheck";
import MoodResult from "./pages/MoodCheck/MoodResult";
import Bot from "./pages/BrainBot/Chatbot";
import Forums from "./pages/Forums";
import Profile from "./pages/Profile/ProfileMain";
import Premium from "./pages/Premium";
import DashboardLayout from "./components/layout/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mood">
            <Route index element={<Mood />} />
            <Route path="result" element={<MoodResult />} />
          </Route>
          <Route path="bot" element={<Bot />} />
          <Route path="forums" element={<Forums />} />
          <Route path="profile" element={<Profile />} />
          <Route path="premium" element={<Premium />} />
        </Route>
        {/* Fallback Route Page */}
        <Route path="*" element={<NotFound />} />
        {/* Explicit /404 Page */}
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}