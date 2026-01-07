import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { useStudentsStore } from "./stores/useStudentsStore";

export function App() {
  const fetchStudents = useStudentsStore(state => state.fetchStudents);
  const initializeAuth = useStudentsStore(state => state.initializeAuth);

  useEffect(() => {
    fetchStudents().then(() => {
      initializeAuth();
    });
  }, [fetchStudents, initializeAuth]);

  return <RouterProvider router={router} />;
}