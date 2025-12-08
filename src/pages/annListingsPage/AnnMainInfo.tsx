import {Box} from "@mui/material";
import {SectionTitle} from "../../components/SectionTitle.tsx";
import {AnnSearchBar} from "./AnnSearchBar.tsx";
import {AnnouncementList} from "../../components/AnnouncementList.tsx";
import type {IAnnouncement} from "../../interfaces/IAnnouncement.ts";
import {useMemo, useState} from "react";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";

type AnnMainInfoProps = {
  dataToDisplay: IAnnouncement[];
}

export function AnnMainInfo({dataToDisplay}: AnnMainInfoProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const getNameById = useTeachersStore(state => state.getNameById);

  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery) return dataToDisplay;

    return dataToDisplay.filter((ann) => {
      const query = searchQuery.toLowerCase();
      const teacher = getNameById(ann.teacherId);

      return (
        ann.message?.toLowerCase().includes(query) ||
        ann.date?.toLowerCase().includes(query) ||
        teacher?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, dataToDisplay, getNameById]);

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

      <AnnouncementList announcements={filteredAnnouncements}/>
    </Box>
  );
}
