import {SectionCard} from "../../components/SectionCard.tsx";
import {Box} from "@mui/material";
import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {type ChangeEvent, useMemo, useState} from "react";
import {AnnPagination} from "./AnnPagination.tsx";
import {AnnMainInfo} from "./AnnMainInfo.tsx";
import {useTeachersStore} from "../../stores/useTeachersStore.ts";

type AnnListContainerProps = {
  itemsPerPage: number;
}

export function AnnListContainer({itemsPerPage}: AnnListContainerProps) {
  const announcement = useAnnouncementsStore(state => state.announcements);
  const getNameById = useTeachersStore(state => state.getNameById);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return announcement;

    return announcement.filter((ann) => {
      const teacher = getNameById(ann.teacherId);
      const query = searchQuery.toLowerCase();

      return (
        ann.message?.toLowerCase().includes(query) ||
        ann.date?.toLowerCase().includes(query) ||
        teacher?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, announcement, getNameById]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;

    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [page, filteredData, itemsPerPage]);

  const count = Math.ceil(filteredData.length / itemsPerPage);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    event.preventDefault();
  };

  return (
    <SectionCard>
      <Box height={"560px"} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <AnnMainInfo
          dataToDisplay={paginatedData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {filteredData.length > 0 && (
          <AnnPagination page={page} count={count} handleChange={handleChange}/>
        )}
      </Box>
    </SectionCard>
  );
}
