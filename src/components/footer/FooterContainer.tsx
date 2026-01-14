import { Container, Divider, Stack } from "@mui/material";
import { FooterSlogan } from "./FooterSlogan.tsx";
import { FooterLinks } from "./FooterLinks.tsx";
import { FooterMedia } from "./FooterMedia.tsx";
import { FooterCopyright } from "./FooterCopyright.tsx";

export function FooterContainer() {
  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        <FooterSlogan />

        <FooterLinks />

        <FooterMedia />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <FooterCopyright />
    </Container>
  );
}
