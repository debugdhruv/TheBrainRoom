import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { XPProvider } from "./context/XPContext";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <XPProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </XPProvider>
    </UserProvider>
  </React.StrictMode>
);