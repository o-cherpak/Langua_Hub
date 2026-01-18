import type {ITeacher} from "../../../interfaces/ITeacher.ts";
import {useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export function TeacherModal({open, onClose, onSave, initialData}: {
  open: boolean, onClose: () => void, onSave: (data: ITeacher) => void, initialData: ITeacher & { uid: string } | null
}) {
  const [formData, setFormData] = useState<ITeacher | null>(null);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    }
  }, [initialData, open]);

  if (!formData) return null;

  const handleChange = (field: keyof ITeacher, value: string) => {
    setFormData(prev => prev ? ({...prev, [field]: value}) : null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edytuj nauczyciela</DialogTitle>

      <DialogContent dividers>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 1}}>
          <TextField label="Imię" fullWidth value={formData.name}
                     onChange={(e) => handleChange("name", e.target.value)}/>
          <TextField label="Nazwisko" fullWidth value={formData.surname}
                     onChange={(e) => handleChange("surname", e.target.value)}/>
          <TextField label="Email" fullWidth value={formData.email}
                     onChange={(e) => handleChange("email", e.target.value)}/>
          <TextField label="Telefon" fullWidth value={formData.phone}
                     onChange={(e) => handleChange("phone", e.target.value)}/>
          <TextField label="Specjalizacja" fullWidth value={formData.specialization}
                     onChange={(e) => handleChange("specialization", e.target.value)}/>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>

        <Button variant="contained" onClick={() => onSave(formData)}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}