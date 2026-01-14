import { Box, Typography } from "@mui/material";
import { CardList } from "../pages/welcomePage/CardList.tsx";

export function Sidebar() {
  return (
    <Box sx={{ position: "sticky", top: 26 }}>
      <Typography
        color="text.secondary"
        sx={{
          mb: 2,
          fontWeight: 700,
          fontSize: 20,
          textTransform: "uppercase",
        }}
      >
        Szybki dostęp
      </Typography>

      <CardList />
    </Box>
  );
}
