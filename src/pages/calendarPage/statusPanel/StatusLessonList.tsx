import {Stack, Typography} from "@mui/material";
import {ScheduleList} from "../../../components/sheduleList/ScheduleList";
import {EventBusy} from "@mui/icons-material";
import type {ICourse} from "../../../interfaces/ICourse.ts";

type StatusLessonListProps = {
  hasLessons?: boolean;
  todayCourses: ICourse[]
}

export function StatusLessonList({hasLessons, todayCourses}: StatusLessonListProps) {
  return (
    <>
      {hasLessons ? (
        <ScheduleList courses={todayCourses}/>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            py: 4,
            textAlign: "center",
            border: "2px dashed",
            borderColor: "grey.200",
            borderRadius: 2,
          }}
        >
          <EventBusy sx={{fontSize: 48, color: "grey.300", mb: 1}}/>

          <Typography
            variant="body1"
            sx={{color: "text.secondary", fontWeight: 500}}
          >
            Brak zaplanowanych zajęć
          </Typography>
        </Stack>
      )}</>
  );
}
