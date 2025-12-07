import {ListItemText, Typography} from "@mui/material";
import type {ICourse} from "../../interfaces/ICourse.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";

type ScheduleTextProps = {
  course: ICourse;
}

export function ScheduleText({course}: ScheduleTextProps) {
  const getTeacherNameById = useTeachersStore(state => state.getNameById)

  return (
    <ListItemText
      primary={
        <Typography sx={{fontSize: 18, fontWeight: 600}}>
          {course.subject} — sala {course.classroom}
        </Typography>
      }

      secondary={
        <Typography sx={{color: "gray", fontSize: 18}}>
          Prowadzący: {getTeacherNameById(course.teacherId)}
        </Typography>
      }
    />
  );
}
