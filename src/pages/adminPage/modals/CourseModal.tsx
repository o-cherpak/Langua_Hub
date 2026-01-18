import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Button, Box, MenuItem, FormControl, InputLabel, Select, Chip, OutlinedInput
} from "@mui/material";
import {useState, useEffect} from "react";
import type {ICourse} from "../../../interfaces/ICourse";
import {useTeachersStore} from "../../../stores/useTeachersStore";
import {useStudentsStore} from "../../../stores/useStudentsStore";

interface CourseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ICourse) => void;
  initialData: ICourse | null;
}

export function CourseModal({open, onClose, onSave, initialData}: CourseModalProps) {
  const {teachers} = useTeachersStore();
  const {students} = useStudentsStore();

  const [formData, setFormData] = useState<ICourse>({
    name: "",
    subject: "",
    level: "A1",
    teacherId: "",
    teacherName: "",
    teacherSurname: "",
    studentIds: [],
    classroom: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...initialData,
        studentIds: initialData.studentIds || []
      });
    } else {
      setFormData({
        name: "", subject: "", level: "A1",
        teacherId: "", teacherName: "", teacherSurname: "",
        studentIds: [], classroom: "", startTime: "", endTime: ""
      });
    }
  }, [initialData, open]);

  const handleTeacherSelect = (id: string) => {
    const teacher = teachers.find(t => t.uid === id);
    if (teacher) {
      setFormData(prev => ({
        ...prev,
        teacherId: id,
        teacherName: teacher.name,
        teacherSurname: teacher.surname
      }));
    }
  };

  const handleChange = (field: keyof ICourse, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edytuj kurs" : "Dodaj nowy kurs"}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 1}}>

          <TextField
            label="Nazwa kursu" fullWidth
            value={formData.name} onChange={(e) => handleChange("name", e.target.value)}
          />

          <Box sx={{display: "flex", gap: 2}}>
            <TextField
              label="Przedmiot" fullWidth
              value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)}
            />
            <FormControl sx={{minWidth: 120}}>
              <InputLabel>Poziom</InputLabel>
              <Select
                value={formData.level} label="Poziom"
                onChange={(e) => handleChange("level", e.target.value)}
              >
                {["A1", "A2", "B1", "B2", "C1"].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Nauczyciel</InputLabel>

            <Select
              value={formData.teacherId}
              label="Nauczyciel"
              onChange={(e) => handleTeacherSelect(e.target.value)}
            >
              {teachers.map(t => (
                <MenuItem key={t.uid} value={t.uid}>{t.name} {t.surname} ({t.specialization})</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Studenci</InputLabel>

            <Select
              multiple
              value={formData.studentIds}
              onChange={(e) => handleChange("studentIds", e.target.value as string[])}
              input={<OutlinedInput label="Studenci"/>}
              renderValue={(selected) => (
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                  {selected.map((uid) => {
                    const s = students.find(st => st.uid === uid);
                    return <Chip key={uid} label={s ? `${s.name} ${s.surname}` : uid} size="small"/>;
                  })}
                </Box>
              )}
            >
              {students.map((s) => (
                <MenuItem key={s.uid} value={s.uid}>{s.name} {s.surname}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Sala" fullWidth
            value={formData.classroom} onChange={(e) => handleChange("classroom", e.target.value)}
          />

          <Box sx={{display: "flex", gap: 2}}>
            <TextField
              label="Godzina rozpoczęcia" type="datetime-local" fullWidth
              InputLabelProps={{shrink: true}}
              value={formData.startTime} onChange={(e) => handleChange("startTime", e.target.value)}
            />

            <TextField
              label="Godzina zakończenia" type="datetime-local" fullWidth
              InputLabelProps={{shrink: true}}
              value={formData.endTime} onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </Box>

        </Box>
      </DialogContent>

      <DialogActions sx={{p: 2}}>
        <Button onClick={onClose}>Anuluj</Button>

        <Button variant="contained" onClick={() => onSave(formData)}>Zapisz kurs</Button>
      </DialogActions>
    </Dialog>
  );
}