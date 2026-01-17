import { Box, Button, TextField } from "@mui/material";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { type FormEvent, useState } from "react";
import { auth } from "../../firebaseConfig.ts";

export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (!userCredential.user.email) {
        throw new Error("Email not found");
      }
    } catch (error: any) { /* empty */ }
  };

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleLogin}>
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

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2, py: 1 }}>
        Zaloguj się
      </Button>
    </Box>
  );
}
