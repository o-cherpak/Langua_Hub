import { Box, Grid, Typography } from "@mui/material";
import type { IMark } from "../../../interfaces/IMark.ts";
import { MarksCard } from "./marksCard/MarksCard.tsx";

type MarksCardListProps = {
  marks: IMark[];
};

export function MarksCardList({ marks }: MarksCardListProps) {
  return (
    <Box>
      <Grid container spacing={2}>
        {marks.map((m) => (
          <Grid key={m.id} size={{ xs: 12, md: 6 }}>
            <MarksCard m={m} />
          </Grid>
        ))}
      </Grid>

      {marks.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ py: 4, width: "100%" }}
        >
          Brak ocen dla wybranej kategorii.
        </Typography>
      )}
    </Box>
  );
}
