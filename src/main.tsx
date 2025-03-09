import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppRouterProvider } from "./AppRouter/components/contexts/AppRouterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouterProvider persist>
      <App />
    </AppRouterProvider>
  </StrictMode>
);
