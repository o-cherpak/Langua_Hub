import { Container, Grid, Stack } from "@mui/material";
import { DashboardStudentViewer } from "./DashboardStudentViewer.tsx";
import { DashboardStudentChart } from "./DashboardStudentChart.tsx";
import { Sidebar } from "../../components/Sidebar.tsx";
import type { IMark } from "../../interfaces/IMark.ts";

type DashboardContainerProps = {
  marks: IMark[];
};

export function DashboardContainer({ marks }: DashboardContainerProps) {
  const displayedMarks = marks.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Stack spacing={4}>
            <DashboardStudentViewer marks={displayedMarks} />

            <DashboardStudentChart marks={marks} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Sidebar />
        </Grid>
      </Grid>
    </Container>
  );
}
