import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { XPProvider } from "./context/XPContext";
import { UserProvider } from "./context/UserContext.jsx";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/common/GlobalLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <XPProvider>
        <LoaderProvider>
          <BrowserRouter>
            <App />
            <GlobalLoader />
          </BrowserRouter>
        </LoaderProvider>
      </XPProvider>
    </UserProvider>
  </React.StrictMode>
);