import {useState} from "react";
import {Box, AppBar, Toolbar, Typography, IconButton} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AdminMainContent} from "./AdminMainContent.tsx";
import {AdminSidebar} from "./sidebar/AdminSidebar.tsx";

export type ViewType = "students" | "teachers" | "news" | "marks";

export function AdminPage() {
  const [currentView, setCurrentView] = useState<ViewType>("students");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const togleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", bgcolor: "grey.100"}}>
      <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Panel administratora
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={togleDrawer}
          >
            <Menu/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <AdminSidebar
        view={currentView}
        setCurrentView={setCurrentView}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <AdminMainContent currentView={currentView}/>
    </Box>
  );
}