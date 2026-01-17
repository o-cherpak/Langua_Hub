import {useEffect} from "react";
import {Chip, Stack} from "@mui/material";
import {AdminTable} from "./table/AdminTable.tsx";
import {useCoursesStore} from "../../stores/useCoursesStore.ts";
import {format} from "date-fns";
import {pl} from "date-fns/locale";

const courseColumns = [
  {key: "id", label: "ID"},
  {key: "teacherId", label: "Wykładowca(ID)"},
  { key: "name", label: "Nazwa Kursu" },
  { key: "subject", label: "Przedmiot" },
  { key: "level", label: "Poziom" },
  {key: "teacherName", label: "Imię"},
  {key: "teacherSurname", label: "Nazwisko"},
  { key: "classroom", label: "Sala" },
  {
    key: "startTime",
    label: "Data rozpoczęcia",
    render: (val: Date) => format(val, "dd/MM/yyyy",{locale: pl}),
  },
  {
    key: "studentIds",
    label: "Uczniowie",
    render: (val: string[]) => <Chip label={`Liczba: ${val?.length || 0}`} size="small" />
  }
];

export function AdminCoursesView() {
  const {courses, fetchCourses} = useCoursesStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  return (
    <Stack spacing={3}>

      <AdminTable
        columns={courseColumns}
        data={courses}
      />
    </Stack>
  );
}