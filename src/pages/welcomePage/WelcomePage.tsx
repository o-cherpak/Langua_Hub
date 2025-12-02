import {Container} from "@mui/material";
import {Header} from "../../components/header/Header.tsx";
import {TodayActivity} from "./TodayActivity.tsx";
import {useEffect, useMemo} from "react";
import {useCoursesStore} from "../../stores/useCoursesStore.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";
import {isSameDay} from "date-fns";

export function WelcomePage() {
  const id = 0;
  const selectedDate = new Date("2024-01-16");

  const courses = useCoursesStore(state => state.courses);
  const fetchTeachers = useTeachersStore(state => state.fetchTeachers);
  const fetchCourses = useCoursesStore(state => state.fetchCourses);

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, [fetchCourses, fetchTeachers]);

  const filtered = useMemo(
    () => courses.filter(course => course.studentIds.includes(id))
      .filter(course =>
        isSameDay(new Date(course.startTime), selectedDate)
      ),
    [courses, selectedDate]
  );

  return (
    <>
      <Header/>

      <Container
        maxWidth={"xl"}

      >
        <TodayActivity courses={filtered}/>

      </Container>
    </>
  );
}