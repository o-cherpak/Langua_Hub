import {Box} from "@mui/material";
import {format, isSameDay, isSameMonth} from "date-fns";
import Typography from "@mui/material/Typography";
import {CalendarIndicator} from "./CalendarIndicator.tsx";

const CALENDAR_THEME = {
  TEXT_OTHER_MONTH: "text.disabled",
  TEXT_CURRENT_MONTH: "text.primary",
  TEXT_ON_HOVER: "common.white",

  BG_DEFAULT: "transparent",
  BG_SELECTED_DAY: "action.selected",
  BG_COURSE_DAY: "primary.light",
  BG_HOVER: "primary.main",
};

type CalendarDayProps = {
  day: Date;
  selectedDate: Date;
  hasCourses: (day: Date) => boolean;
  onDateSelect: (date: Date) => void;
};

export function CalendarDay({day, selectedDate, hasCourses, onDateSelect}: CalendarDayProps) {
  const isCurrentMonth = isSameMonth(day, selectedDate);
  const isSelected = isSameDay(day, selectedDate);
  const isCourseDay = hasCourses(day);

  const getCellBackground = () => {
    if (isCourseDay) return CALENDAR_THEME.BG_COURSE_DAY;
    if (isSelected) return CALENDAR_THEME.BG_SELECTED_DAY;
    return CALENDAR_THEME.BG_DEFAULT;
  };

  return (
    <Box
      onClick={() => onDateSelect(day)}
      sx={{
        aspectRatio: "1 / 0.8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        transition: "0.2s ease-in-out",
        bgcolor: getCellBackground(),

        "&:hover": {
          bgcolor: CALENDAR_THEME.BG_HOVER
        },
        "&:hover .day-number": {
          color: CALENDAR_THEME.TEXT_ON_HOVER
        },
      }}
    >
      {isCourseDay && <CalendarIndicator/>}

      <Typography
        className="day-number"
        sx={{
          fontSize: {xs: "1.2rem", md: "2rem"},
          fontWeight: 800,
          color: isCurrentMonth
            ? CALENDAR_THEME.TEXT_CURRENT_MONTH
            : CALENDAR_THEME.TEXT_OTHER_MONTH,
        }}
      >
        {format(day, "d")}
      </Typography>
    </Box>
  );
}