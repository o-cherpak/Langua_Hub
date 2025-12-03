import {Button, Container} from "@mui/material";
import {Header} from "../../components/Header.tsx";
import {TodayActivity} from "./TodayActivity.tsx";
import {useEffect, useMemo} from "react";
import {useCoursesStore} from "../../stores/useCoursesStore.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";
import {isSameDay} from "date-fns";
import Box from "@mui/material/Box";
import {Footer} from "../../components/Footer.tsx";

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
        sx={{height: "100vh"}}

      >
        <Box >
          <TodayActivity courses={filtered}/>

          <Button
            variant="contained"
            component="a"
            href=""
          >
            Zobacz rozkład
          </Button>
        </Box>

      </Container>

      <Footer/>
    </>
  );
}