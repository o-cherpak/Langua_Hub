import { Box, Typography } from "@mui/material";

const daysOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

export function CalendarHeader() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        borderBottom: 1,
        borderColor: "divider",
        py: 1,
      }}
    >
      {daysOfWeek.map((day) => (
        <Box key={day} sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              color: "primary.main",
              letterSpacing: "1px"
            }}
          >
            {day}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
