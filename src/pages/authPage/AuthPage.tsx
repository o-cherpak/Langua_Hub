import {
  Container
} from "@mui/material";
import {AuthLogin} from "./AuthLogin.tsx";
import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {useNavigate} from "react-router";


export function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await useStudentsStore.getState().fetchUser(user.uid);
        navigate("/welcome");
      } else {
        useStudentsStore.getState().clearAuth();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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

      <AuthLogin/>
    </Container>
  );
}