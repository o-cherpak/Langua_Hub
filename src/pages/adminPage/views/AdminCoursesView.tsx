import {useEffect, useState} from "react";
import {Button, Chip, Stack} from "@mui/material";
import {AdminTable} from "../table/AdminTable.tsx";
import {useCoursesStore} from "../../../stores/useCoursesStore.ts";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import {CourseModal} from "../modals/CourseModal.tsx";
import {useStudentsStore} from "../../../stores/useStudentsStore.ts";
import {useTeachersStore} from "../../../stores/useTeachersStore.ts";
import type {ICourse} from "../../../interfaces/ICourse.ts";
import AddIcon from "@mui/icons-material/Add";

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
  const { courses, fetchCourses, addCourse, updateCourse, deleteCourse } = useCoursesStore();
  const { fetchStudents } = useStudentsStore();
  const { fetchTeachers } = useTeachersStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchTeachers();
  }, [fetchCourses, fetchStudents, fetchTeachers]);

  const handleEdit = (course: ICourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data: ICourse) => {
    if (selectedCourse?.id) {
      await updateCourse(selectedCourse.id, data);
    } else {
      await addCourse(data);
    }
    setIsModalOpen(false);
  };


  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Dodaj Kurs
        </Button>
      </Stack>

      <AdminTable
        columns={courseColumns}
        data={courses}
        onEdit={handleEdit}
        onDelete={(row) => {
          if (window.confirm("Czy na pewno chcesz usunąć ten kurs?")) {
            deleteCourse(row.id!);
          }
        }}
      />

      <CourseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedCourse}
      />
    </Stack>
  );
}