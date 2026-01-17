import {useEffect} from "react";
import {Stack} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useAnnouncementsStore} from "../../../stores/useAnnouncementsStore.ts";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {pl} from "date-fns/locale";

const announcementColumns = [
  {key: "id", label: "ID"},
  {
    key: "date",
    label: "Data",
    render: (val: Date) => format(val, "dd/MM/yyyy",{locale: pl})
  },
  {key: "authorName", label: "Imię"},
  {key: "authorSurname", label: "Nazwisko"},
  {
    key: "message",
    label: "Treść",
    render: (val: string) => (
      <Typography variant="body2" sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {val}
      </Typography>
    )
  }
];

export function AdminNewsView() {
  const {announcements, fetchAnnouncement} = useAnnouncementsStore();

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);


  return (
    <Stack spacing={3}>

      <AdminTable
        columns={announcementColumns}
        data={announcements}
      />
    </Stack>
  );
}