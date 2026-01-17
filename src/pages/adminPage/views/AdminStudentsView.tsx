import {useEffect} from "react";
import {Container, Stack} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useStudentsStore} from "../../../stores/useStudentsStore.ts";

import {Chip, Box} from "@mui/material";
import type {ILanguage} from "../../../interfaces/ILanguage.ts";
import {AdminForm, type FormField} from "../AdminForm.tsx";

const studentColumns = [
  {key: "uid", label: "ID"},
  {key: "name", label: "Imię"},
  {key: "surname", label: "Nazwisko"},
  {key: "email", label: "Email"},
  {key: "phone", label: "Telefon"},
  {
    key: "languages",
    label: "Języki",
    render: (langs: ILanguage[]) => (
      <Box sx={{display: "flex", gap: 0.5, flexWrap: "wrap"}}>
        {langs?.map((l, i) => (
          <Chip key={i} label={`${l.subject} (${l.level})`} size="small"/>
        ))}
      </Box>
    )
  },
  {key: "role", label: "Rola",}
];

const studentFormFields: FormField[] = [
  { key: 'name', label: 'Imię' },
  { key: 'surname', label: 'Nazwisko' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Telefon' },
  { key: 'role', label: 'Rola' },
];

export function AdminStudentsView() {
  const {students, fetchStudents} = useStudentsStore();
  const addStudent = useStudentsStore(state => state.addStudent);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <Container maxWidth="xl" sx={{py: 4}}>
      <Stack spacing={3}>
        <AdminForm
          title={"Dodaj studenta"}
          fields={studentFormFields}
          onSave={addStudent}
        />

        <AdminTable
          columns={studentColumns}
          data={students}
        />
      </Stack>
    </Container>
  );
}