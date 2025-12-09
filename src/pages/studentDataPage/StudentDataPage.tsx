import {Header} from "../../components/Header.tsx";
import {Box, Container, Grid} from "@mui/material";
import {Sidebar} from "../../components/Sidebar.tsx";
import {Footer} from "../../components/Footer.tsx";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {StudentInfoViewer} from "./StudentInfoViewer.tsx";

const id = 20;

export const StudentDataPageLoader = async () => {
  await Promise.all([
    useStudentsStore.getState().fetchStudents(),
  ])

  return null;
}

export function StudentDataPage() {
  const students = useStudentsStore(state => state.students);
  const studentData = students.find(student => student.id === id);

  if (!studentData) return null;

  console.log(studentData);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>

          <Grid size={{xs: 12, md: 8, lg: 9}}>
            <StudentInfoViewer student={studentData}/>
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
