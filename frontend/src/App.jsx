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
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { isSessionValid } from "@/utils/session";
import BotIntro from "./pages/BrainBot/BotIntro";
import AboutPage from "@/pages/About";
import PasswordProtectPage from "./pages/pwdProtect";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={isSessionValid() ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="mood">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Mood />
                </ProtectedRoute>
              }
            />
            <Route
              path="result"
              element={
                <ProtectedRoute>
                  <MoodResult />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="bot"
            element={
              <ProtectedRoute>
                <BotIntro />
              </ProtectedRoute>
            }
          />
          <Route
            path="bot/chat"
            element={
              <ProtectedRoute>
                <Bot />
              </ProtectedRoute>
            }
          />
          <Route
            path="forums"
            element={
              <ProtectedRoute>
                <Forums />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/pwd-protect" element={
          <ProtectedRoute>
            <PasswordProtectPage />
          </ProtectedRoute>
          }
        />
        
        {/* Fallback Route Page */}
        <Route path="*" element={<NotFound />} />
        {/* Explicit /404 Page */}
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}