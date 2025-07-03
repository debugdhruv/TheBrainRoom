import { useContext } from "react";
import { XPContext } from "./XPContext";

export const useXP = () => useContext(XPContext);