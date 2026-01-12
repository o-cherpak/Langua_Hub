import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type AnnSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AnnSearchBar({ value, onChange }: AnnSearchBarProps) {
  return (
    <TextField
      size="small"
      placeholder="Jutro..."
      value={value}
      sx={{width:"280px"}}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={() => onChange("")} size="small">
              <ClearIcon fontSize="small" sx={{color: "error.main"}} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}