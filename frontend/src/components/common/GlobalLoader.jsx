import { useLoader } from "@/context/LoaderContext";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-cyan-700 animate-spin" />
    </div>
  );
}