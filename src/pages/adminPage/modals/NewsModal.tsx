import {Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box} from "@mui/material";
import {useState, useEffect} from "react";
import type {IAnnouncement} from "../../../interfaces/IAnnouncement";

export function NewsModal({open, onClose, onSave, initialData}: any) {
  const [formData, setFormData] = useState<IAnnouncement>({
    authorName: "",
    authorSurname: "",
    message: "",
    date: new Date().toISOString()
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    } else {
      setFormData({
        authorName: "Administrator", // Можна поставити значення за замовчуванням
        authorSurname: "",
        message: "",
        date: new Date().toISOString()
      });
    }
  }, [initialData, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edytuj ogłoszenie" : "Nowe ogłoszenie"}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, pt: 1}}>
          <Box sx={{display: "flex", gap: 2}}>
            <TextField
              label="Imię autora" fullWidth
              value={formData.authorName} onChange={(e) => setFormData({...formData, authorName: e.target.value})}
            />

            <TextField
              label="Nazwisko autora" fullWidth
              value={formData.authorSurname} onChange={(e) => setFormData({...formData, authorSurname: e.target.value})}
            />
          </Box>

          <TextField
            label="Treść wiadomości"
            multiline rows={5} fullWidth
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{p: 2}}>
        <Button onClick={onClose}>Anuluj</Button>

        <Button variant="contained" onClick={() => onSave(formData)}>
          {initialData ? "Zapisz zmiany" : "Opublikuj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}