import {SectionCard} from "../../components/SectionCard.tsx";
import {SectionTitle} from "../../components/SectionTitle.tsx";
import {AnnouncementList} from "../../components/AnnouncementList.tsx";
import {Box, Pagination, Stack} from "@mui/material";
import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {type ChangeEvent, useState} from "react";

type AnnListContainerProps = {
  itemsPerPage: number;
}

export function AnnListContainer({itemsPerPage}: AnnListContainerProps) {
  const announcement = useAnnouncementsStore(state => state.announcements);
  const [page, setPage] = useState(1);

  const count = Math.ceil(announcement.length / itemsPerPage);

  const dataToDisplay = announcement.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    event.preventDefault();
  };

  return (
    <SectionCard>
      <Box height={"560px"} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <Box height={"460px"}>
          <SectionTitle title={"Ogłoszenia"}/>

          <AnnouncementList announcements={dataToDisplay}/>
        </Box>

        <Stack spacing={2} alignItems="center">
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </SectionCard>
  );
}
