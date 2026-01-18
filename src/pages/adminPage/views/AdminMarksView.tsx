import {useEffect, useState} from "react";
import {Container, Stack, Button, Chip} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useMarksStore} from "../../../stores/useMarksStore.ts";
import {useStudentsStore} from "../../../stores/useStudentsStore.ts";
import {useTeachersStore} from "../../../stores/useTeachersStore.ts";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import AddIcon from "@mui/icons-material/Add";
import type {IMark} from "../../../interfaces/IMark.ts";
import {MarkModal} from "../modals/MarkModal.tsx";

export function AdminMarksView() {
  const {marks, fetchAllMarks, addMark, updateMark, deleteMark} = useMarksStore();
  const {fetchStudents} = useStudentsStore();
  const {fetchTeachers} = useTeachersStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState<IMark | null>(null);

  useEffect(() => {
    fetchAllMarks();
    fetchStudents();
    fetchTeachers();
  }, [fetchAllMarks, fetchStudents, fetchTeachers]);

  const handleEdit = (mark: any) => {
    setSelectedMark(mark);
    setIsModalOpen(true);
  };

  const handleSave = async (data: IMark) => {
    if (selectedMark?.id) {
      await updateMark(selectedMark.id, data);
    } else {
      await addMark(data);
    }
    setIsModalOpen(false);
    setSelectedMark(null);
  };

  const handleDelete = (id: string | undefined) => {
    if (id && window.confirm("Usunąć ocenę?")) {
      deleteMark(id);
    }
  }

  const markColumns = [
    {key: "id", label: "ID"},
    {key: "studentId", label: "Uczeń ID"},
    {key: "teacherId", label: "Wykładowca ID"},
    {
      key: "language",
      label: "Przedmiot",
      render: (val: any) => <Chip label={`${val.subject} (${val.level})`} size="small"/>
    },
    {key: "mark", label: "Ocena"},
    {
      key: "date",
      label: "Data",
      render: (val: string) => format(new Date(val), "dd/MM/yyyy", {locale: pl}),
    }
  ];

  return (
    <Container maxWidth="xl" sx={{py: 4}}>
      <Stack spacing={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon/>}
          onClick={() => {
            setSelectedMark(null);
            setIsModalOpen(true);
          }}
          sx={{alignSelf: "flex-start"}}
        >
          Dodaj ocenę
        </Button>

        <AdminTable
          title="Dziennik ocen"
          columns={markColumns}
          data={marks}
          onEdit={handleEdit}
          onDelete={(m) => handleDelete(m.id)}
        />

        <MarkModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedMark}
        />
      </Stack>
    </Container>
  );
}