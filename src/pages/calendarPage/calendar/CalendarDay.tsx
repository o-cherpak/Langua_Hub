import {Box} from "@mui/material";
import {format, isSameDay, isSameMonth} from "date-fns";
import Typography from "@mui/material/Typography";
import {CalendarIndicator} from "./CalendarIndicator.tsx";

type CalendarDayProps = {
  day: Date
  selectedDate: Date
  hasCourses: (day: Date) => boolean;
  onDateSelect: (date: Date) => void;
}

export function CalendarDay({day, selectedDate, hasCourses, onDateSelect}: CalendarDayProps) {
  const isCurrentMonth = isSameMonth(day, selectedDate);
  const isSelected = isSameDay(day, selectedDate);
  const activeDay = hasCourses(day);

  return (
    <Box
      key={day.toString()}
      onClick={() => onDateSelect(day)}
      sx={{
        aspectRatio: '1 / 0.8',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: '0.2s',
        bgcolor: activeDay ? 'primary.light' : isSelected ? '#ccc' : 'transparent',
        '&:hover': {bgcolor: 'primary.dark'},
        '&:hover .child-text': {color: "white"},
      }}
    >
      {activeDay && <CalendarIndicator/>}

      <Typography
        className="child-text"
        sx={{
          fontSize: {xs: '1.2rem', md: '2rem'},
          fontWeight: 800,
          color: isCurrentMonth ? 'primary.dark' : '#ccc',
        }}
      >
        {format(day, 'd')}
      </Typography>
    </Box>
  );
}
