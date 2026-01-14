import { Box, Typography, Stack, IconButton } from "@mui/material";
import { addMonths, format, isSameDay, subMonths } from "date-fns";
import {
  RadioButtonChecked,
  CircleOutlined,
  EventBusy,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useCoursesStore } from "../../stores/useCoursesStore";
import { useStudentsStore } from "../../stores/useStudentsStore";
import { SectionCard } from "../../components/SectionCard.tsx";
import { ScheduleList } from "../../components/sheduleList/ScheduleList.tsx";
import { pl } from "date-fns/locale";

type StatusPanelProps = {
  date: Date;
  onDateSelect: (date: Date) => void;
};

export function StatusPanel({ date, onDateSelect }: StatusPanelProps) {
  const courses = useCoursesStore((state) => state.courses);
  const userId = useStudentsStore((state) => state.uid);

  const todayCourses = courses.filter(
    (c) =>
      c.studentIds?.includes(userId || "") &&
      isSameDay(new Date(c.startTime), date),
  );

  const handlePrevMonth = () => {
    onDateSelect(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    onDateSelect(addMonths(date, 1));
  };

  const hasLessons = todayCourses.length > 0;

  return (
    <Box sx={{ pt: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 2,
          color: hasLessons ? "primary.main" : "text.disabled",
        }}
      >
        {hasLessons ? (
          <RadioButtonChecked sx={{ fontSize: 28 }} />
        ) : (
          <CircleOutlined sx={{ fontSize: 28 }} />
        )}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}
        >
          Status Dnia: {hasLessons ? "Zajęcia" : "Wolne"}
        </Typography>
      </Box>

      <SectionCard>
        <Stack direction="row" alignItems="end" justifyContent="space-between">
          <IconButton onClick={handlePrevMonth} sx={{ color: "primary.dark" }}>
            <ChevronLeft fontSize="large" />
          </IconButton>

          <Typography
            fontSize={24}
            fontWeight={600}
            sx={{ color: "primary.main", mb: 2 }}
          >
            {format(date, "dd MMMM, eeee", { locale: pl })}
          </Typography>

          <IconButton onClick={handleNextMonth} sx={{ color: "primary.dark" }}>
            <ChevronRight fontSize="large" />
          </IconButton>
        </Stack>

        {hasLessons ? (
          <ScheduleList courses={todayCourses} />
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
            <EventBusy sx={{ fontSize: 48, color: "grey.300", mb: 1 }} />

            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Brak zaplanowanych zajęć
            </Typography>
          </Stack>
        )}
      </SectionCard>
    </Box>
  );
}
