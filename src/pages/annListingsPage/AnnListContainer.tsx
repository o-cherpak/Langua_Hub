import {SectionCard} from "../../components/SectionCard.tsx";
import {Box} from "@mui/material";
import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {type ChangeEvent, useState} from "react";
import {AnnPagination} from "./AnnPagination.tsx";
import {AnnMainInfo} from "./AnnMainInfo.tsx";

type AnnListContainerProps = {
  itemsPerPage: number;
}

export function AnnListContainer({itemsPerPage}: AnnListContainerProps) {
  const announcement = useAnnouncementsStore(state => state.announcements);
  const [page, setPage] = useState(1);

  const dataToDisplay = announcement.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const count = announcement.length / itemsPerPage;

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    event.preventDefault();
  };

  return (
    <SectionCard>
      <Box height={"560px"} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <AnnMainInfo dataToDisplay={dataToDisplay}/>

        <AnnPagination page={page} count={count} handleChange={handleChange}/>
      </Box>
    </SectionCard>
  );
}
