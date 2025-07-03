import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { XPProvider } from "./context/XPContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <XPProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </XPProvider>
  </React.StrictMode>
);