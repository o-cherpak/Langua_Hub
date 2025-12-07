import {
  Box,
  List,
  Typography,
  Divider
} from "@mui/material";
import {SectionCard} from "../../components/SectionCard.tsx";
import type {IMark} from "../../interfaces/IMark.ts";
import {MarksListItem} from "./MarksListItem.tsx";

type MarksStudentViewerProps = {
  marks: IMark[];
}

export function MarksStudentViewer({marks}: MarksStudentViewerProps) {
  const reversedMarks = [...marks].reverse();

  return (
    <SectionCard>
      <Typography variant="h5" fontWeight="bold">
        Oceny i analiza
      </Typography>

      <List>
        {reversedMarks.map((mark, index) => (
          <Box key={mark.id}>
            {index > 0 && <Divider/>}

            <MarksListItem mark={mark}/>
          </Box>
        ))}
      </List>
    </SectionCard>
  );
}