import {
  Container,
  Grid,
} from "@mui/material";
import {useMemo, useState} from "react";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {MarksSideBar} from "./marksSideBar/MarksSideBar.tsx";
import {MarksMainPart} from "./marksMainPart/MarksMainPart.tsx";

export function MarksContainer() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const {marks} = useMarksStore();
  const {currentUserId, students} = useStudentsStore();

  const currentStudent = useMemo(() => students.find(s => s.id === currentUserId)
    , [students, currentUserId]);

  const filteredMarks = useMemo(() => {
    const studentMarks = marks.filter(m => m.studentId === currentUserId)

    if (activeFilter === "All") return studentMarks;
    return studentMarks.filter(m => m.language.subject === activeFilter);
  }, [marks, currentUserId, activeFilter]);

  return (
    <Container maxWidth="lg" sx={{py: 5}}>
      <Grid container spacing={4}>

        <MarksMainPart
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          marks={filteredMarks}
          currentStudent={currentStudent}
        />

        <MarksSideBar
          marks={filteredMarks}
          activeFilter={activeFilter}
          currentStudent={currentStudent}
        />

      </Grid>
    </Container>
  );
}
