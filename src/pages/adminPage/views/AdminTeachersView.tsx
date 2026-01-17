import {useEffect} from "react";
import {Container, Stack} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useTeachersStore} from "../../../stores/useTeachersStore.ts";

const teacherColumns = [
  {key: "uid", label: "ID"},
  {key: "name", label: "Imię"},
  {key: "surname", label: "Nazwisko"},
  {key: "specialization", label: "Specjalizacja"},
  {key: "email", label: "Email"},
  {key: "phone", label: "Telefon"},
  {key: "role", label: "Rola"}
];

export function AdminTeacherView() {
  const {teachers, fetchTeachers} = useTeachersStore();

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);


  return (
    <Container maxWidth="xl" sx={{py: 4}}>
      <Stack spacing={3}>
        <AdminTable
          columns={teacherColumns}
          data={teachers}
        />
      </Stack>
    </Container>
  );
}