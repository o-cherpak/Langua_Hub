import {Box, Button, Link, TextField} from "@mui/material";
import {useState} from "react";

export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box component="form" sx={{width: "100%"}}>
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
        type="password"
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

      <Box sx={{textAlign: "center"}}>
        <Link
          component="button"
          variant="body2"
          type="button"
          onClick={() => {
            setEmail("");
            setPassword("");
          }}
        >
          Nie masz konta? Zarejestruj się

        </Link>
      </Box>
    </Box>
  );
}
