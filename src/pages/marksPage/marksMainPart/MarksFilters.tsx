import {Chip, Stack} from "@mui/material";
import type {IStudent} from "../../../interfaces/IStudent.ts";

type MarksFiltersProps = {
  currentStudent?: IStudent,
  activeFilter: string,
  setActiveFilter: (activeFilter: string) => void,
}

export function MarksFilters({currentStudent, activeFilter, setActiveFilter}: MarksFiltersProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{mb: 3, overflowX: 'auto', pb: 1}}
    >
      <Chip
        label="Wszystkie języki"
        onClick={() => setActiveFilter("All")}
        color={activeFilter === "All" ? "primary" : "default"}
        sx={{fontWeight: 600, px: 1}}
      />
      {currentStudent?.languages.map((lang) => (
        <Chip
          key={lang.subject}
          label={lang.subject}
          onClick={() => setActiveFilter(lang.subject)}
          color={activeFilter === lang.subject ? "primary" : "default"}
          sx={{fontWeight: 600, px: 1}}
        />
      ))}
    </Stack>
  );
}
