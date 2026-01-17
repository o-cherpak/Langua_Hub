import {useState} from "react";
import {TextField, Button, Grid, Typography, Box} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";

export interface FormField {
  key: string;
  label: string;
  type?: string;
}

interface AdminFormProps {
  title: string;
  fields: FormField[];
  onSave: (values: any) => void;
}

export function AdminForm({title, fields, onSave}: AdminFormProps) {
  const initialState = fields.reduce((acc, field) => ({...acc, [field.key]: ""}), {});
  const [formData, setFormData] = useState<Record<string, any>>(initialState);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({...prev, [key]: value}));
  };

  const handleAdd = () => {
    if (Object.values(formData).every(val => val.trim() !== "")) {
      onSave(formData);
      setFormData(initialState);
    } else {
      alert("Proszę wypełnić wszystkie pola");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{mb: 2, fontWeight: "bold"}}>
        {title}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {fields.map((field) => (
          <Grid size={{xs: 12, sm: 6, md: 2.4}} key={field.key}>
            <TextField
              fullWidth
              size="small"
              label={field.label}
              type={field.type || "text"}
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              InputLabelProps={field.type === "date" ? {shrink: true} : {}}
            />
          </Grid>
        ))}

        <Grid size={{xs: 12, md: 2.4}}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={handleAdd}
            sx={{height: "40px"}}
          >
            Dodaj
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}