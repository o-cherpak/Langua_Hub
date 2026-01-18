import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type { IMark } from "../../interfaces/IMark.ts";

type DashboardListItemProps = {
  mark: IMark;
};

export function DashboardListItem({ mark }: DashboardListItemProps) {
  return (
    <ListItem sx={{ py: 2 }}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {mark.language.subject[0]}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography fontWeight="600">{mark.language.subject}</Typography>
        }
        secondaryTypographyProps={{ component: "div" }}
        secondary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 14 }} />

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {format(new Date(mark.date), "d MMMM", { locale: pl })}
            </Typography>
          </Box>
        }
      />

      <Typography
        variant="h5"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {mark.mark}
      </Typography>
    </ListItem>
  );
}
