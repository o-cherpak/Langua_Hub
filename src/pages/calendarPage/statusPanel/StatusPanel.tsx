import {Box} from "@mui/material";
import {addMonths, isSameDay, subMonths} from "date-fns";
import {useCoursesStore} from "../../../stores/useCoursesStore.ts";
import {useStudentsStore} from "../../../stores/useStudentsStore.ts";
import {SectionCard} from "../../../components/SectionCard.tsx";
import {StatusHeader} from "./StatusHeader.tsx";
import {StatusLessonList} from "./StatusLessonList.tsx";
import {StatusButtons} from "./StatusButtons.tsx";

type StatusPanelProps = {
  date: Date;
  onDateSelect: (date: Date) => void;
};

export function StatusPanel({date, onDateSelect}: StatusPanelProps) {
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
    <Box sx={{pt: 4}}>
      <StatusHeader hasLessons={hasLessons}/>

      <SectionCard>
        <StatusButtons
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          date={date}
        />

        <StatusLessonList hasLessons={hasLessons} todayCourses={todayCourses}/>
      </SectionCard>
    </Box>
  );
}
