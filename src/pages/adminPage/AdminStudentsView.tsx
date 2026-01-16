import {useEffect} from "react";
import {Container, Stack} from "@mui/material";
import {AdminTable} from "./table/AdminTable.tsx";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";

const studentColumns = [
  {key: "uid", label: "ID Użytkownika"},
  {key: "name", label: "Imię"},
  {key: "surname", label: "Nazwisko"},
  {key: "email", label: "Email"},
  {key: "phone", label: "Telefon"},
  {key: "role", label: "Rola"},
];

export function AdminStudentsView() {
  const {students, fetchStudents} = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);


  return (
    <Container maxWidth="xl" sx={{py: 4}}>
      <Stack spacing={3}>
        <AdminTable
          columns={studentColumns}
          data={students}
        />
      </Stack>
    </Container>
  );
}