import {Box, Button, TextField} from "@mui/material";
import {browserSessionPersistence, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {type FormEvent, useState} from "react";
import {auth} from "../../firebaseConfig.ts";
import {toast} from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const loginAction = async () => {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.email) {
        throw new Error("Email not found");
      }

      return userCredential.user;
    };

    await toast.promise(loginAction(), {
      loading: 'Logowanie...',
      success: 'Zalogowano pomyślnie!',
      error: (err: FirebaseError) => {
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            return "Błędny email lub hasło";
          case 'auth/too-many-requests':
            return "Zbyt wiele prób logowania. Spróbuj później.";
          default:
            return `Wystąpił błąd: ${err.message}`;
        }
      }
    });
  };

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

      <Button type="submit" fullWidth variant="contained" sx={{my: 2, py: 1}}>
        Zaloguj się
      </Button>
    </Box>
  );
}
