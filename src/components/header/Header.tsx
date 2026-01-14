import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { UserMenu } from "./UserMenu.tsx";
import { MainMenu } from "./MainMenu.tsx";

export function Header() {
  return (
    <Box sx={{ mb: 10 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MainMenu />

            <Typography
              component={Link}
              to={"/welcome"}
              variant="h5"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Lingua Hub
            </Typography>
          </Box>

          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
