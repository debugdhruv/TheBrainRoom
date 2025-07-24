import { loaderEvents } from "@/context/loaderEvents";

export const apiFetch = async (...args) => {
  loaderEvents.emit("show-loader"); // Trigger loader ON
  try {
    return await fetch(...args);
  } finally {
    loaderEvents.emit("hide-loader"); // Trigger loader OFF
  }
};