import { Container, Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { useMarksStore } from "../../stores/useMarksStore.ts";
import { MarksSideBar } from "./marksSideBar/MarksSideBar.tsx";
import { MarksMainPart } from "./marksMainPart/MarksMainPart.tsx";
import { useUsersStore } from "../../stores/useUsersStore.ts";

export function MarksContainer() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const { marks } = useMarksStore();
  const user = useUsersStore((state) => state.user);

  const filteredMarks = useMemo(() => {
    if (activeFilter === "All") return marks;
    return marks.filter((m) => m.language.subject === activeFilter);
  }, [marks, activeFilter]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <MarksMainPart
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          marks={filteredMarks}
          currentStudent={user}
        />

        <MarksSideBar marks={filteredMarks} activeFilter={activeFilter} />
      </Grid>
    </Container>
  );
}
