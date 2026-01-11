import {
  Box
} from "@mui/material";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {Header} from "../../components/Header.tsx";
import {Footer} from "../../components/footer/Footer.tsx";
import {MarksContainer} from "./MarksContainer.tsx";

export const MarksPageLoader = async () => {

  await Promise.all([
    useMarksStore.getState().fetchMarks(),
    useStudentsStore.getState().fetchStudents(),
  ])

  return null;
}

export function MarksPage() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: "#f4f6f8"}}>
      <Header/>

      <MarksContainer/>

      <Footer/>
    </Box>
  );
}