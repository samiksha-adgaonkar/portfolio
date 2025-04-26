import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Suspense } from "react";
import { Progress } from "@/components/ui/progress";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Progress className="fixed top-0 left-0 right-0 z-50" />}>
    <App />
  </Suspense>
);
