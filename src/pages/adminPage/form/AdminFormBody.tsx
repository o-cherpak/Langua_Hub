import {Grid, TextField} from "@mui/material";
import type {FormField} from "./AdminForm.tsx";

type AdminFormBodyProps = {
  fields: FormField[];
  formData: any;
  handleChange: (key: string, value: any) => void;
}

export function AdminFormBody({fields, formData, handleChange}: AdminFormBodyProps) {
  return (
    <>
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
    </>
  );
}
