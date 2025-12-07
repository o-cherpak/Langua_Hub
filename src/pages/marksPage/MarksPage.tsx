import {Header} from "../../components/Header.tsx";
import {Box, Container, Grid, Stack} from "@mui/material";
import {Sidebar} from "../../components/Sidebar.tsx";
import {Footer} from "../../components/Footer.tsx";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {MarksStudentChart} from "./MarksStudentChart.tsx";
import {MarksStudentViewer} from "./MarksStudentViewer.tsx";

const id = 5;

export const MarksPageLoader = async () => {
  await Promise.all([
    useMarksStore.getState().fetchMarks(),
  ])

  return null;
}

export function MarksPage() {
  const marks = useMarksStore(state => state.marks);
  const filteredMark = marks.filter((mark) => mark.studentId === id);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>

          <Grid size={{xs: 12, md: 8, lg: 9}}>
            <Stack spacing={4}>
              <MarksStudentViewer marks={filteredMark}/>

              <MarksStudentChart marks={filteredMark}/>
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