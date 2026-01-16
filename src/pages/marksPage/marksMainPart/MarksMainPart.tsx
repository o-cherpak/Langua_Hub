import { Box, Grid, Typography } from "@mui/material";
import type { IStudent } from "../../../interfaces/IStudent.ts";
import type {IMark} from "../../../interfaces/IMark.ts";
import { MarksCardList } from "./MarksCardList.tsx";
import { MarksFilters } from "./MarksFilters.tsx";
import { SectionTitle } from "../../../components/SectionTitle.tsx";
import { useMemo, useState } from "react";
import { LoadMoreButton } from "../../../components/buttons/LoadMoreButton.tsx";

type MarksMainPartProps = {
  activeFilter: string;
  setActiveFilter: (activeFilter: string) => void;
  marks: IMark[];
  currentStudent: IStudent | null;
};

export function MarksMainPart({
  activeFilter,
  setActiveFilter,
  marks,
  currentStudent,
}: MarksMainPartProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const STEP = 4;
  const hasMore = visibleCount < marks.length;

  const displayedMarks = useMemo(() => {
    return marks.slice(0, visibleCount);
  }, [marks, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + STEP);
  };

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Box sx={{ mb: 4 }}>
        <SectionTitle title={"Oceny"} />

        <Typography variant="subtitle1" color="text.secondary">
          Przeglądaj swoje wyniki i monitoruj postępy w nauce.
        </Typography>
      </Box>

      <MarksFilters
        currentStudent={currentStudent}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <MarksCardList marks={displayedMarks} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {hasMore ? (
          <LoadMoreButton
            title={"Pokaż więcej ocen"}
            onClickHandler={handleLoadMore}
          />
        ) : (
          <Typography variant="body2" color="text.disabled">
            To są wszystkie Twoje oceny.
          </Typography>
        )}
      </Box>
    </Grid>
  );
}
