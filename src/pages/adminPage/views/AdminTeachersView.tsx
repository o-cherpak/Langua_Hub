import { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { AdminTable } from "../table/AdminTable.tsx";
import { useTeachersStore } from "../../../stores/useTeachersStore.ts";
import { TeacherModal } from "../modals/TeacherModal.tsx";
import type {ITeacher} from "../../../interfaces/ITeacher.ts";
import {AdminForm} from "../form/AdminForm.tsx";

const teacherFields = [
  { key: "name", label: "Imię" },
  { key: "surname", label: "Nazwisko" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Telefon" },
  { key: "specialization", label: "Specjalizacja" },
];

const teacherColumns = [
  { key: "uid", label: "ID" },
  { key: "name", label: "Imię" },
  { key: "surname", label: "Nazwisko" },
  { key: "specialization", label: "Specjalizacja" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Telefon" },
  { key: "role", label: "Rola" }
];

export function AdminTeacherView() {
  const { teachers, fetchTeachers, addTeacher, updateTeacher, deleteTeacher } = useTeachersStore();

  const [selectedTeacher, setSelectedTeacher] = useState<(ITeacher) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleEditClick = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (teacher: any) => {
    if (window.confirm(`Czy na pewno chcesz usunąć nauczyciela ${teacher.name} ${teacher.surname}?`)) {
      await deleteTeacher(teacher.uid);
    }
  };

  const handleSaveEdit = async (updatedData: ITeacher) => {
    if (selectedTeacher?.uid) {
      await updateTeacher(selectedTeacher.uid, updatedData);
      setIsModalOpen(false);
      setSelectedTeacher(null);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <AdminForm
          title="Dodaj nauczyciela"
          fields={teacherFields}
          onSave={addTeacher}
        />

        <AdminTable
          title="Lista Nauczycieli"
          columns={teacherColumns}
          data={teachers}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <TeacherModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTeacher(null);
          }}
          initialData={selectedTeacher}
          onSave={handleSaveEdit}
        />
      </Stack>
    </Container>
  );
}