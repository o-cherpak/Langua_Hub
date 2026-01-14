import { Grid, Stack } from "@mui/material";
import { useMemo } from "react";
import type { IMark } from "../../../interfaces/IMark.ts";
import { MarksSideBarContainer } from "./MarksSideBarContainer.tsx";

type MarksSideBarProps = {
  marks: IMark[];
  activeFilter: string;
};

export function MarksSideBar({ marks, activeFilter }: MarksSideBarProps) {
  const stats = useMemo(() => {
    if (marks.length === 0) return { avg: String(0), count: 0 };

    const sum = marks.reduce((acc, m) => acc + Number(m.mark), 0);

    return {
      avg: (sum / marks.length).toFixed(1),
      count: marks.length,
    };
  }, [marks]);

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Stack sx={{ position: { md: "sticky" }, top: 40 }}>
        <MarksSideBarContainer stats={stats} activeFilter={activeFilter} />
      </Stack>
    </Grid>
  );
}
