import { Container } from "@mui/material";
import { AuthLogin } from "./AuthLogin.tsx";
import { useEffect } from "react";
import { useUsersStore } from "../../stores/useUsersStore.ts";
import { useNavigate } from "react-router";

export function AuthPage() {
  const navigate = useNavigate();
  const { role, loading, uid } = useUsersStore();

  useEffect(() => {
    if (!loading && uid && role) {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "student" || role === "teacher") {
        navigate("/welcome", { replace: true });
      }
    }
  }, [loading, uid, role, navigate]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1976d2 0%, #664fa2 100%)",
      }}
    >
      <AuthLogin />
    </Container>
  );
}
