import {Box} from "@mui/material";
import {SectionTitle} from "../../components/SectionTitle.tsx";
import {AnnSearchBar} from "./AnnSearchBar.tsx";
import {AnnouncementList} from "../../components/AnnouncementList.tsx";
import type {IAnnouncement} from "../../interfaces/IAnnouncement.ts";

type AnnMainInfoProps = {
  dataToDisplay: IAnnouncement[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function AnnMainInfo({dataToDisplay, searchQuery, setSearchQuery}: AnnMainInfoProps) {
  return (
    <Box height={"460px"}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      >
        <SectionTitle title={"Ogłoszenia"}/>

        <AnnSearchBar value={searchQuery} onChange={setSearchQuery}/>
      </Box>

      <AnnouncementList announcements={dataToDisplay}/>
    </Box>
  );
}
