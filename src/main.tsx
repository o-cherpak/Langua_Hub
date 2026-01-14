import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.ts";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router";
import { useStudentsStore } from "./stores/useStudentsStore.ts";

useStudentsStore.getState().initializeAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
