import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IconProvider, TooltipProvider } from "@silk/components";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </IconProvider>
  </StrictMode>,
);
