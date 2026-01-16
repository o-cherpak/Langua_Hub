import { Navigate } from "react-router";
import {useUsersStore} from "../stores/useUsersStore.ts";
import type { ReactNode } from "react";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { role } = useUsersStore();

  if (role !== "admin") {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}