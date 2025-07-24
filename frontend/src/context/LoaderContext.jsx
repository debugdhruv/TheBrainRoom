import { createContext, useContext, useEffect, useState } from "react";
import { loaderEvents } from "./loaderEvents";

const LoaderContext = createContext();
export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);

    loaderEvents.on("start", start);
    loaderEvents.on("stop", stop);

    return () => {
      loaderEvents.off("start", start);
      loaderEvents.off("stop", stop);
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {children}
    </LoaderContext.Provider>
  );
};