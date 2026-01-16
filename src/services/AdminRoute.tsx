import { Navigate } from "react-router";
import {useUsersStore} from "../stores/useUsersStore.ts";
import type { ReactNode } from "react";
import {Box, CircularProgress} from "@mui/material";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { role, loading, uid } = useUsersStore();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!uid) {
    return <Navigate to="/" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}