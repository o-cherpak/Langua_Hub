import {useState} from "react";
import {Grid, Typography, Box} from "@mui/material";
import {AdminFormBody} from "./AdminFormBody.tsx";
import {AddNewButton} from "./AddNewButton.tsx";

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
        <AdminFormBody
          fields={fields}
          formData={formData}
          handleChange={handleChange}
        />

        <Grid size={{xs: 12, md: 2.4}}>
          <AddNewButton handleAdd={handleAdd} />
        </Grid>
      </Grid>
    </Box>
  );
}