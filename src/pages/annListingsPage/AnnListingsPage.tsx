import {Header} from "../../components/Header.tsx";
import {Box, Container, Grid} from "@mui/material";
import {Sidebar} from "../../components/Sidebar.tsx";
import {Footer} from "../../components/footer/Footer.tsx";
import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";
import {AnnListContainer} from "./AnnListContainer.tsx";

export const AnnListingsPageLoader = async () => {
  await Promise.all([
    useAnnouncementsStore.getState().fetchAnnouncement(),
    useTeachersStore.getState().fetchTeachers(),
  ]);

  return null;
}

export function AnnListingsPage() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: "grey.100"}}>
      <Header/>

      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>

          <Grid size={{xs: 12, md: 8, lg: 9}}>
            <AnnListContainer itemsPerPage={4}/>
          </Grid>

          <Grid size={{xs: 12, md: 4, lg: 3}}>
            <Sidebar/>
          </Grid>

        </Grid>
      </Container>

      <Footer/>
    </Box>
  );
}
