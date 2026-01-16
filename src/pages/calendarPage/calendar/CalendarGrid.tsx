import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Box } from "@mui/material";
import * as React from "react";
import { useCoursesStore } from "../../../stores/useCoursesStore.ts";
import { useUsersStore } from "../../../stores/useUsersStore.ts";
import { CalendarDay } from "./CalendarDay.tsx";

type CalendarGridProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

export function CalendarGrid({
  selectedDate,
  onDateSelect,
}: CalendarGridProps) {
  const courses = useCoursesStore((state) => state.courses);
  const userId = useUsersStore((state) => state.uid);

  const calendarDays = React.useMemo(() => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [selectedDate]);

  const hasCourses = (date: Date) => {
    return courses.some(
      (course) =>
        course.studentIds?.includes(userId || "") &&
        isSameDay(new Date(course.startTime), date),
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        bgcolor: "white",
      }}
    >
      {calendarDays.map((day) => {
        return (
          <CalendarDay
            key={day.toString()}
            day={day}
            hasCourses={hasCourses}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        );
      })}
    </Box>
  );
}
