import {Container, Box, Stack, Grid} from "@mui/material";
import {Header} from "../../components/Header.tsx";
import {useMemo} from "react";
import {useCoursesStore} from "../../stores/useCoursesStore.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";
import {isSameDay} from "date-fns";
import {Footer} from "../../components/footer/Footer.tsx";
import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {NewsSection} from "../../components/NewsSection.tsx";
import {Sidebar} from "../../components/Sidebar.tsx";
import {ScheduleSection} from "./ScheduleSection.tsx";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";

const selectedDate = new Date("2024-01-15");

export const WelcomePageLoader = async () => {
  await Promise.all([
    useCoursesStore.getState().fetchCourses(),
    useStudentsStore.getState().fetchStudents(),
    useTeachersStore.getState().fetchTeachers(),
    useAnnouncementsStore.getState().fetchAnnouncement(),
  ])

  return null;
}

export function WelcomePage() {
  const {courses} = useCoursesStore();
  const userId = useStudentsStore(state => state.currentUserId);

  const filteredCourses = useMemo(() => {
    if (userId === null) return [];

    return courses
      .filter((c) => c.studentIds.includes(userId))
      .filter((c) => isSameDay(new Date(c.startTime), selectedDate))

  }, [courses, userId]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>

          <Grid size={{xs: 12, md: 8, lg: 9}}>
            <Stack spacing={4}>
              <ScheduleSection courses={filteredCourses}/>

              <NewsSection/>
            </Stack>
          </Grid>

          <Grid size={{xs: 12, md: 4, lg: 3}}>
            <Sidebar/>
          </Grid>

        </Grid>
      </Container>

      <Footer/>
    </Box>
  );
}