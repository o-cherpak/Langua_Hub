import {Box, Typography} from "@mui/material";

export function FooterSlogan() {
  return (
    <Box sx={{textAlign: {xs: "center", md: "left"}}}>
      <Typography variant="h6" color="primary.main">
        Langua_Hub
      </Typography>

      <Typography variant="subtitle1" color="text.primary">
        Twoja droga do swobodnej komunikacji.
      </Typography>
    </Box>
  );
}
