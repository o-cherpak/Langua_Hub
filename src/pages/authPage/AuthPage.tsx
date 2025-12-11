import {
  Container,
  keyframes
} from "@mui/material";
import {AuthLogin} from "./AuthLogin.tsx";

const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

export function AuthPage() {

  return (
    <Container
      maxWidth="xl"
      sx={{
        background: "linear-gradient(-45deg, #1976d2, #0d47a1)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 100s ease infinite`,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${gradientAnimation})`,
      }}
    >
      <AuthLogin/>
    </Container>
  );
}