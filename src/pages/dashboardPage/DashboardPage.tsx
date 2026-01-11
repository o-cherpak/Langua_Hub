import {Header} from "../../components/Header.tsx";
import {Box} from "@mui/material";
import {Footer} from "../../components/footer/Footer.tsx";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {DashboardContainer} from "./DashboardContainer.tsx";

export const DashboardPageLoader = async () => {
  await Promise.all([
    useMarksStore.getState().fetchMarks(),
    useStudentsStore.getState().fetchStudents(),
  ])

  return null;
}

export function DashboardPage() {
  const userId = useStudentsStore(state => state.currentUserId)
  const marks = useMarksStore(state => state.marks);

  const filteredMark = marks.filter((mark) => mark.studentId === userId);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <DashboardContainer marks={filteredMark}/>

      <Footer/>
    </Box>
  );
}