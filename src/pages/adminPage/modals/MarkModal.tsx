import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  Button, Box, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";
import {useState, useEffect} from "react";
import type {IMark} from "../../../interfaces/IMark";
import {useStudentsStore} from "../../../stores/useStudentsStore";
import {useTeachersStore} from "../../../stores/useTeachersStore";

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

  const handleLangChange = (field: "subject" | "level", value: string) => {
    setFormData(prev => ({
      ...prev,
      language: {...prev.language, [field]: value}
    }));
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
              onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
            >
              {teachers.map(t => (
                <MenuItem key={t.uid} value={t.uid}>{t.name} {t.surname}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{display: "flex", gap: 1}}>
            <TextField
              label="Przedmiot" fullWidth
              value={formData.language.subject}
              onChange={(e) => handleLangChange("subject", e.target.value)}
            />

            <TextField
              label="Poziom" sx={{width: "100px"}}
              value={formData.language.level}
              onChange={(e) => handleLangChange("level", e.target.value)}
            />
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