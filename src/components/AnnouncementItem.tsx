import {ListItem, ListItemText, Typography, Box} from "@mui/material";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import {useTeachersStore} from "../stores/useTeachersStore.ts";
import type {IAnnouncement} from "../interfaces/IAnnouncement.ts";

type AnnouncementItemProps = {
  data: IAnnouncement;
};

export function AnnouncementItem({data}: AnnouncementItemProps) {
  const getTeacherNameById = useTeachersStore(state => state.getNameById);

  const formattedDate = format(new Date(data.date), "d MMMM, HH:mm", {
    locale: pl,
  });

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        paddingY: 2,
      }}
    >
      <Typography sx={{fontSize: 18, fontWeight: 500}}>
        {data.message}
      </Typography>

      <ListItemText
        secondaryTypographyProps={{component: "div"}}
        sx={{width: "100%", borderBottom: "1px solid rgba(0,0,0,0.08)"}}
        secondary={
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography sx={{color: "gray", fontSize: 14}}>
              {getTeacherNameById(data.teacherId)}
            </Typography>

            <Typography sx={{color: "gray", fontSize: 14}}>
              {formattedDate}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}
