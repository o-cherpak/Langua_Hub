import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type { ICourse } from "../interfaces/ICourse.ts";
import { ScheduleList } from "./sheduleList/ScheduleList.tsx";

type TodayActivityProps = {
  courses: ICourse[];
};

export function TodayActivity({ courses }: TodayActivityProps) {
  const dayName = format(new Date(), "EEEE, d MMMM", { locale: pl });
  const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {formattedDayName}
      </Typography>

      <ScheduleList courses={courses} />
    </Box>
  );
}
