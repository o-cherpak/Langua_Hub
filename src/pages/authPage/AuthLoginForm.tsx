import {Box, Button, TextField} from "@mui/material";
import {signInWithEmailAndPassword} from "firebase/auth";
import {type FormEvent, useState} from "react";
import {auth} from "../../firebaseConfig.ts";
import {useNavigate} from "react-router";
import {getIdByEmail} from "../../services/getIdByEmail.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";

export const AuthLoginFormLoader = async () => {
  await Promise.all([
    useStudentsStore.getState().fetchStudents(),
  ])

  return null;
}

export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const students = useStudentsStore().students;

  const navigate = useNavigate();


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.email) {
        throw new Error("Email not found");
      }

      const userId = getIdByEmail({list: students, email: userCredential.user.email});


      navigate("/welcome", {state: {userId: userId}});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component="form" sx={{width: "100%"}} onSubmit={handleLogin}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Hasło"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{my: 2, py: 1}}
      >
        Zaloguj się
      </Button>

    </Box>
  );
}
