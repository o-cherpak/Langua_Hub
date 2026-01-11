import {Box, Grid, Typography} from "@mui/material";
import type {IStudent} from "../../../interfaces/IStudent.ts";
import type {IMark} from "../../../interfaces/IMark.ts";
import {MarksCardList} from "./MarksCardList.tsx";
import {MarksFilters} from "./MarksFilters.tsx";
import {SectionTitle} from "../../../components/SectionTitle.tsx";

type MarksMainPartProps = {
  activeFilter: string,
  setActiveFilter: (activeFilter: string) => void,
  marks: IMark[],
  currentStudent?: IStudent,
}

export function MarksMainPart({activeFilter, setActiveFilter, marks, currentStudent}: MarksMainPartProps) {
  return (
    <Grid size={{xs: 12, md: 8}}>
      <Box sx={{mb: 4}}>
        <SectionTitle title={"Oceny"}/>

        <Typography variant="subtitle1" color="text.secondary">
          Przeglądaj swoje wyniki i monitoruj postępy w nauce.
        </Typography>
      </Box>

      <MarksFilters
        currentStudent={currentStudent}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <MarksCardList marks={marks}/>
    </Grid>
  );
}
