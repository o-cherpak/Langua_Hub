import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import {useState, useEffect} from "react";
import type {ILanguage} from "../../interfaces/ILanguage.ts";
import type {IStudent} from "../../interfaces/IStudent.ts";

type StudentModalProps = {
  open: boolean,
  onClose: () => void,
  onSave: (data: IStudent) => void,
  initialData: IStudent & { uid: string } | null
}

export function StudentModal({open, onClose, onSave, initialData}: StudentModalProps) {
  const [formData, setFormData] = useState<IStudent | null>(null);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...initialData,
        languages: initialData.languages || []
      });
    }
  }, [initialData, open]);

  if (!formData) return null;

  const handleChange = (field: keyof IStudent, value: any) => {
    setFormData(prev => prev ? ({...prev, [field]: value}) : null);
  };

  const handleLanguageChange = (index: number, field: "subject" | "level", value: string) => {
    const newLangs = [...formData.languages];
    newLangs[index] = {...newLangs[index], [field]: value};
    handleChange("languages", newLangs);
  };

  const addLanguage = () => {
    handleChange("languages", [...formData.languages, {subject: "", level: ""}]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edytuj studenta</DialogTitle>

      <DialogContent dividers>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 1}}>
          <TextField
            label="Imię"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            label="Nazwisko"
            fullWidth
            value={formData.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            label="Telefon"
            fullWidth
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Divider sx={{my: 1}}>
            <Typography variant="caption">Języki</Typography>
          </Divider>

          {formData.languages?.map((lang: ILanguage, index: number) => (
            <Box key={index} sx={{display: "flex", gap: 1, alignItems: "center"}}>
              <TextField
                size="small" label="Przedmiot" value={lang.subject}
                onChange={(e) => handleLanguageChange(index, "subject", e.target.value)}
              />

              <TextField
                size="small" label="Poziom" value={lang.level}
                onChange={(e) => handleLanguageChange(index, "level", e.target.value)}
              />

              <IconButton
                color="error"
                onClick={() => {
                  handleChange("languages", formData.languages)
                }}
              >
                <Delete/>
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<Add/>}
            onClick={addLanguage}
            variant="outlined"
            size="small"
          >
            Dodaj język
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>

        <Button variant="contained" onClick={() => onSave(formData)}>Zapisz zmiany</Button>
      </DialogActions>
    </Dialog>
  );
}