import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.ts";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router";
import { useUsersStore } from "./stores/useUsersStore.ts";
import { Toaster } from 'react-hot-toast';

useUsersStore.getState().initializeAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />

      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
