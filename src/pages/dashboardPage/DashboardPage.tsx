import {Header} from "../../components/Header.tsx";
import {Box, Container, Grid, Stack} from "@mui/material";
import {Sidebar} from "../../components/Sidebar.tsx";
import {Footer} from "../../components/footer/Footer.tsx";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {DashboardStudentChart} from "./DashboardStudentChart.tsx";
import {DashboardStudentViewer} from "./DashboardStudentViewer.tsx";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";

export const DashboardPageLoader = async () => {
  await Promise.all([
    useMarksStore.getState().fetchMarks(),
    useStudentsStore.getState().fetchStudents(),
  ])

  return null;
}

export function DashboardPage() {
  const marks = useMarksStore(state => state.marks);
  const userId = useStudentsStore(state => state.currentUserId)
  const filteredMark = marks.filter((mark) => mark.studentId === userId);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>

          <Grid size={{xs: 12, md: 8, lg: 9}}>
            <Stack spacing={4}>
              <DashboardStudentViewer marks={filteredMark}/>

              <DashboardStudentChart marks={filteredMark}/>
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