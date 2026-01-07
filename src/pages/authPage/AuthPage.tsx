import {
  Container
} from "@mui/material";
import {AuthLogin} from "./AuthLogin.tsx";
import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {getIdByEmail} from "../../services/getIdByEmail.ts";


export function AuthPage() {
  const students = useStudentsStore(state => state.students);
  const setUser = useStudentsStore(state => state.setCurrentUserId)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        const userId = getIdByEmail({ list: students, email: user.email });
        setUser(userId);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, students]);

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