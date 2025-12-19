import {
  Box,
  List,
  Divider
} from "@mui/material";
import {SectionCard} from "../../components/SectionCard.tsx";
import type {IMark} from "../../interfaces/IMark.ts";
import {DashboardListItem} from "./DashboardListItem.tsx";
import {ViewAllButton} from "../../components/ViewAllButton.tsx";
import {SectionTitle} from "../../components/SectionTitle.tsx";

type DashboardStudentViewerProps = {
  marks: IMark[];
}

export function DashboardStudentViewer({marks}: DashboardStudentViewerProps) {
  const reversedMarks = [...marks].reverse();

  return (
    <SectionCard>
      <SectionTitle title={"Oceny i analiza"}/>

      <List>
        {reversedMarks.map((mark, index) => (
          <Box key={mark.id}>
            {index > 0 && <Divider/>}

            <DashboardListItem mark={mark}/>
          </Box>
        ))}
      </List>

      <ViewAllButton href={'/'} title={"Zobać wszystkie oceny"}/>
    </SectionCard>
  );
}