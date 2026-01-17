import {useEffect} from "react";
import {Chip, Stack} from "@mui/material";
import {AdminTable} from "./table/AdminTable.tsx";
import {useMarksStore} from "../../stores/useMarksStore.ts";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import type {ILanguage} from "../../interfaces/ILanguage.ts";

const markColumns = [
  {key: "id", label: "Ocena(ID)"},
  {key: "studentId", label: "Uczeń(ID)"},
  {key: "teacherId", label: "Wykładowca(ID)"},
  {
    key: "language",
    label: "Przedmiot",
    render: (val: ILanguage) => <Chip label={`${val.subject} (${val.level})`} size="small"/>
  },
  {key: "mark", label: "Ocena",},
  {
    key: "date",
    label: "Data",
    render: (val: string) => format(val, "dd/MM/yyyy", {locale: pl}),
  }
];

export function AdminMarksView() {
  const {marks, fetchAllMarks} = useMarksStore();

  useEffect(() => {
    fetchAllMarks();
  }, [fetchAllMarks]);


  return (
    <Stack spacing={3}>

      <AdminTable
        columns={markColumns}
        data={marks}
      />
    </Stack>
  );
}