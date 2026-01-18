import {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useAnnouncementsStore} from "../../../stores/useAnnouncementsStore.ts";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import {NewsModal} from "../modals/NewsModal.tsx";
import type {IAnnouncement} from "../../../interfaces/IAnnouncement.ts";
import AddIcon from "@mui/icons-material/Add";

const announcementColumns = [
  {key: "id", label: "ID"},
  {
    key: "date",
    label: "Data",
    render: (val: Date) => format(val, "dd/MM/yyyy", {locale: pl})
  },
  {key: "authorName", label: "Imię"},
  {key: "authorSurname", label: "Nazwisko"},
  {
    key: "message",
    label: "Treść",
    render: (val: string) => (
      <Typography variant="body2"
                  sx={{maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
        {val}
      </Typography>
    )
  }
];

export function AdminNewsView() {
  const {
    announcements,
    fetchAnnouncement,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  } = useAnnouncementsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAnnouncement | null>(null);

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);

  const handleDelete = (id: string | undefined) => {
    if (id && window.confirm("Usunąć to ogłoszenie?")) {
      deleteAnnouncement(id)
    }
  }


  return (
    <Stack spacing={3}>
      <Button
        variant="contained"
        startIcon={<AddIcon/>}
        onClick={() => {
          setSelectedItem(null);
          setIsModalOpen(true);
        }}
        sx={{alignSelf: "flex-start"}}
      >
        Dodaj ogłoszenie
      </Button>

      <AdminTable
        title="Ogłoszenia szkolne"
        columns={announcementColumns}
        data={announcements}
        onEdit={(item) => {
          setSelectedItem(item);
          setIsModalOpen(true);
        }}
        onDelete={(item) => handleDelete(item.id)}
      />

      <NewsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (data: IAnnouncement) => {
          if (selectedItem?.id) await updateAnnouncement(selectedItem.id, data);
          else await addAnnouncement(data);
          setIsModalOpen(false);
        }}
        initialData={selectedItem}
      />
    </Stack>
  );
}