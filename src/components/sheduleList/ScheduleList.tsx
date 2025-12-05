import {Box, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {format} from "date-fns";
import type {ICourse} from "../../interfaces/ICourse.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";

type ScheduleListProps = {
  courses: ICourse[];
}

export function ScheduleList({courses}: ScheduleListProps) {
  const getTeacherNameById = useTeachersStore((s) => s.getNameById);

  return (
    <List sx={{width: "100%"}}>
      {courses.map((course, index) => (
        <Box key={course.id}>
          <ListItem
            sx={{
              display: "flex",
              gap: 3,
              background: "#f7f9fc",
              borderRadius: 2,
              paddingY: 1.5,
              paddingX: 2,
              mb: 1,
              transition: "0.2s",
              "&:hover": {
                background: "#eef2f7",
                cursor: "pointer"
              },
            }}
          >
            <Box sx={{minWidth: 70}}>
              <Typography sx={{fontWeight: 600}}>
                {format(new Date(course.startTime), "HH:mm")}
              </Typography>

              <Typography sx={{fontWeight: 600}}>
                {format(new Date(course.endTime), "HH:mm")}
              </Typography>
            </Box>

            <ListItemText
              primary={
                <Typography sx={{fontSize: 18, fontWeight: 600}}>
                  {course.subject} — {course.classroom}
                </Typography>
              }

              secondary={
                <Typography sx={{color: "gray", fontSize: 18}}>
                  Prowadzący: {getTeacherNameById(course.teacherId)}
                </Typography>
              }
            />
          </ListItem>

          {index < courses.length - 1 && <Divider sx={{my: 1}}/>}
        </Box>
      ))}
    </List>
  );
}