import {
  Container
} from "@mui/material";
import {AuthLogin} from "./AuthLogin.tsx";


export function AuthPage() {
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