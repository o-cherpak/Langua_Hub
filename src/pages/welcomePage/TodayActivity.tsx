import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type { ICourse } from "../../interfaces/ICourse.ts";
import {useTeachersStore, } from "../../stores/useTeachersStore.ts";

type TodayActivityProps = {
  courses: ICourse[];
}

export function TodayActivity({ courses }: TodayActivityProps) {
  const dayName = format(new Date(), "EEEE, d MMMM", { locale: pl });
  const getTeacherNameById = useTeachersStore(state => state.getNameById)

  const formattedDayName =
    dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return (
    <Box>

      <Typography
      >
        {formattedDayName}
      </Typography>

      <List>
        {courses.map((course, index) => (
          <Box key={course.id}>

            <ListItem sx={{ display: "flex", gap: 3 }}>

              <Box>
                <Typography>
                  {format(new Date(course.startTime), "HH:mm")}
                </Typography>

                <Typography>
                  {format(new Date(course.endTime), "HH:mm")}
                </Typography>
              </Box>

              <ListItemText
                primary={
                  <Typography>
                    {course.subject} — sala {course.classroom}
                  </Typography>
                }

                secondary={
                  <Typography>
                    Prowadzący: {getTeacherNameById(course.teacherId)}
                  </Typography>
                }
              />
            </ListItem>

            {index < courses.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </List>

    </Box>
  );
}
