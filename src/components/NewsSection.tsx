import {SectionCard} from "./SectionCard.tsx";
import {Typography} from "@mui/material";
import {AnnouncementList} from "../pages/welcomePage/AnnouncementList.tsx";

export function NewsSection () {
  return (
    <SectionCard>
      <Typography variant="h5" sx={{fontWeight: 700, mb: 2}}>
        Ostatnie ogłoszenia
      </Typography>

      <AnnouncementList/>
    </SectionCard>
  );
}