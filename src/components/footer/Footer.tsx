import { Box } from "@mui/material";

import { FooterContainer } from "./FooterContainer.tsx";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: "white",
        borderTop: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <FooterContainer />
    </Box>
  );
}
