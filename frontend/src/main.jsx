import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/Authpage";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/MoodCheck/MoodCheck";
import MoodResult from "./pages/MoodCheck/MoodResult";
import Bot from "./pages/BrainBot/Chatbot";
import Forums from "./pages/Forums";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";

import DashboardLayout from "./components/layout/DashboardLayout";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />

        {/* Dashboard + Nested Tabs */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          {/* MoodCheck Flow */}
          <Route path="mood">
            <Route index element={<Mood />} />
            <Route path="result" element={<MoodResult />} />
          </Route>

          <Route path="bot" element={<Bot />} />
          <Route path="forums" element={<Forums />} />
          <Route path="profile" element={<Profile />} />
          <Route path="premium" element={<Premium />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);