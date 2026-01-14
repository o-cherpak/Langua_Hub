import { Box, Divider, List } from "@mui/material";
import type { ICourse } from "../../interfaces/ICourse.ts";
import { ScheduleListItem } from "./ScheduleListItem.tsx";

type ScheduleListProps = {
  courses: ICourse[];
};

export function ScheduleList({ courses }: ScheduleListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {courses.map((course, index) => (
        <Box key={course.id}>
          <ScheduleListItem course={course} />

          {index < courses.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </List>
  );
}
