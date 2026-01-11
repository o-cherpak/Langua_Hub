import {Stack, Typography} from "@mui/material";
import type {IMark} from "../../../interfaces/IMark.ts";
import {MarksCard} from "./marksCard/MarksCard.tsx";

type MarksCardListProps = {
  marks: IMark[];
}

export function MarksCardList({marks}: MarksCardListProps) {
  return (
    <Stack spacing={2}>
      {marks.map((m) => <MarksCard m={m}/>)}

      {marks.length <= 0 && (
        <Typography variant="body1" color="text.secondary" textAlign={"center"}>
          Brak ocen для wybranej kategorii.
        </Typography>
      )}
    </Stack>
  );
}
