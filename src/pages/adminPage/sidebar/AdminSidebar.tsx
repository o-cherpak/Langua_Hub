import {Divider, Drawer} from "@mui/material";
import {type ReactNode} from "react";
import type {ViewType} from "../AdminPage.tsx";
import {AdminSidebarList} from "./AdminSidebarList.tsx";

type AdminSidebarProps = {
  view: ViewType
  setCurrentView: (view: ViewType) => void
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export interface MenuItem {
  id: ViewType;
  label: string;
  icon: ReactNode;
}


export function AdminSidebar({view, setCurrentView, setIsDrawerOpen, isDrawerOpen}: AdminSidebarProps) {

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleMenuItemClick = (view: ViewType) => {
    setCurrentView(view);
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {pt: 7, boxSizing: "border-box", width: 240},
      }}
    >
      <Divider/>

      <AdminSidebarList view={view} handleMenuItemClick={handleMenuItemClick} />

    </Drawer>
  );
}
