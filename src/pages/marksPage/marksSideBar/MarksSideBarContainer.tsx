import {SectionCard} from "../../../components/SectionCard.tsx";
import {Box, Divider, Stack} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import {SectionTitle} from "../../../components/SectionTitle.tsx";
import type {IStudent} from "../../../interfaces/IStudent.ts";
import {MarksSideBarTop} from "./MarksSideBarTop.tsx";
import {MarksSideBarBottom} from "./MarksSideBarBottom.tsx";

type MarksSideBarContainerProps = {
  stats: { avg: string; count: number }
  activeFilter: string,
  currentStudent?: IStudent,
}

export function MarksSideBarContainer({stats, activeFilter, currentStudent}: MarksSideBarContainerProps) {
  return (
    <SectionCard>
      <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
        <BarChartIcon color="primary"/>

        <SectionTitle title={"Twoje Podsumowanie"}/>
      </Box>

      <Stack spacing={3}>
        <MarksSideBarTop avg={stats.avg}/>

        <Divider/>

        <MarksSideBarBottom
          count={stats.count}
          activeFilter={activeFilter}
          currentStudent={currentStudent}
        />
      </Stack>
    </SectionCard>
  );
}
