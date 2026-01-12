import {Header} from "../../components/header/Header.tsx";
import {Box} from "@mui/material";
import {Footer} from "../../components/footer/Footer.tsx";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {DashboardContainer} from "./DashboardContainer.tsx";
import {getCurrentUser} from "../../services/getCurrentUser.ts";

export const DashboardPageLoader = async () => {
  const user = await getCurrentUser();

  if(user) {
    await Promise.all([
      useMarksStore.getState().fetchMarks(user?.uid),
    ])
  }

  return null;
}

export function DashboardPage() {
  const userId = useStudentsStore(state => state.uid)
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