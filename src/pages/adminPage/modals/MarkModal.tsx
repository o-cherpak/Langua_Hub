import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Button, Box, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";
import {useState, useEffect} from "react";
import type {IMark} from "../../../interfaces/IMark";
import {useStudentsStore} from "../../../stores/useStudentsStore";
import {useTeachersStore} from "../../../stores/useTeachersStore";
import type {ICourse} from "../../../interfaces/ICourse.ts";

interface MarkModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: IMark) => void;
  initialData: IMark | null;
}

export function MarkModal({open, onClose, onSave, initialData}: MarkModalProps) {
  const {students} = useStudentsStore();
  const {teachers} = useTeachersStore();

  const [formData, setFormData] = useState<IMark>({
    studentId: "",
    teacherId: "",
    language: {subject: "", level: ""},
    mark: 0,
    date: new Date().toISOString()
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    } else {
      setFormData({
        studentId: "",
        teacherId: "",
        language: {subject: "", level: ""},
        mark: 0,
        date: new Date().toISOString(),
      });
    }
  }, [initialData, open]);

  const handleChange = (field: keyof ICourse, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? "Edytuj ocenę" : "Dodaj nową ocenę"}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 1}}>

          <FormControl fullWidth>
            <InputLabel>Uczeń</InputLabel>

            <Select
              value={formData.studentId}
              label="Uczeń"
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            >
              {students.map(s => (
                <MenuItem key={s.uid} value={s.uid}>{s.name} {s.surname}</MenuItem>
              ))}
            </Select>
          </FormControl>

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

          <Box sx={{display: "flex", gap: 1}}>
            <TextField
              label="Przedmiot" fullWidth
              value={formData.language.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />

            <FormControl sx={{minWidth: 120}}>
              <InputLabel>Poziom</InputLabel>

              <Select
                value={formData.language.level} label="Poziom"
                onChange={(e) => handleChange("level", e.target.value)}
              >
                {["A1", "A2", "B1", "B2", "C1"].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Ocena (0-100)" type="number" fullWidth
            value={formData.mark}
            onChange={(e) => setFormData({...formData, mark: Number(e.target.value)})}
          />

          <TextField
            label="Data" type="datetime-local" fullWidth
            value={formData.date.slice(0, 16)}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>

        <Button variant="contained" onClick={() => onSave(formData)}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}