import {Add as AddIcon} from "@mui/icons-material";
import {Button} from "@mui/material";

type AddNewButtonProps = {
  handleAdd: () => void;
}

export function AddNewButton({handleAdd}: AddNewButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<AddIcon/>}
      onClick={handleAdd}
      sx={{height: "40px"}}
    >
      Dodaj
    </Button>
  );
}
