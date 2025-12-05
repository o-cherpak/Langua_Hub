import {ListItem} from "@mui/material";
import type {ICourse} from "../../interfaces/ICourse";
import {ScheduleTime} from "./ScheduleTime.tsx";
import {ScheduleText} from "./ScheduleText.tsx";

type ScheduleListItemProps = {
  course: ICourse;
}

export function ScheduleListItem({course}: ScheduleListItemProps) {
  return (
    <ListItem
      sx={{
        display: "flex",
        gap: 3,
        background: "#f7f9fc",
        borderRadius: 2,
        paddingY: 2,
        paddingX: 2,
        mb: 1,
        transition: "0.2s",
        "&:hover": {
          background: "#eef2f7",
          cursor: "pointer"
        },
      }}
    >
      <ScheduleTime startTime={course.startTime} endTime={course.endTime}/>

      <ScheduleText course={course}/>
    </ListItem>
  );
}