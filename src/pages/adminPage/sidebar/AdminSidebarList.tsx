import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import type {ViewType} from "../AdminPage.tsx";
import type { MenuItem } from "./AdminSidebar";
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type AdminSidebarListProps = {
  view: ViewType
  handleMenuItemClick: (id: ViewType) => void
}

const menuItems: MenuItem[] = [
  {id: "students", label: "Studenty", icon: <SchoolIcon/>},
  {id: "teachers", label: "Wykładowcy", icon: <SupervisorAccountIcon/>},
  {id: "news", label: "Ogłoszenia", icon: <EmailIcon/>},
  {id: "marks", label: "Oceny", icon: <AnalyticsIcon/>},
  {id: "courses", label: "Zajęcia", icon: <AccessTimeIcon/>},
];

export function AdminSidebarList({view, handleMenuItemClick}: AdminSidebarListProps) {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            selected={view === item.id}
            onClick={() => handleMenuItemClick(item.id)}
          >
            <ListItemIcon sx={{color: view === item.id ? "primary.main" : "inherit"}}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} sx={{color: view === item.id ? "primary.main" : "inherit"}}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
