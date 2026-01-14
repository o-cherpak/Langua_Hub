import {Box, Typography} from "@mui/material";

const daysOfWeek = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];

export function CalendarHeader() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        bgcolor: 'white',
        color: "primary.main"
      }}
    >
      {daysOfWeek.map((day) => (
        <Box key={day} sx={{p: 1, textAlign: 'center'}}>
          <Typography variant="caption" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
            {day}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
