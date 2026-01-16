import { Header } from "../../components/header/Header.tsx";
import { Box, Container, Grid } from "@mui/material";
import { Sidebar } from "../../components/Sidebar.tsx";
import { Footer } from "../../components/footer/Footer.tsx";
import { useUsersStore } from "../../stores/useUsersStore.ts";
import { StudentInfoViewer } from "./StudentInfoViewer.tsx";

export function StudentDataPage() {
  const studentData = useUsersStore((state) => state.user);

  if (!studentData) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey.100",
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <StudentInfoViewer student={studentData} />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
