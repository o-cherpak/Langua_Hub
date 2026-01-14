import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

type ScheduleTimeProps = {
  startTime: string;
  endTime: string;
};

export function ScheduleTime({ startTime, endTime }: ScheduleTimeProps) {
  return (
    <Box sx={{ minWidth: 70 }}>
      <Typography sx={{ fontWeight: 600 }}>
        {format(new Date(startTime), "HH:mm")}
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>
        {format(new Date(endTime), "HH:mm")}
      </Typography>
    </Box>
  );
}
