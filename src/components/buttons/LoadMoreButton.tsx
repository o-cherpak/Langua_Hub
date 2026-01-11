import {Button} from "@mui/material";

type LoadMoreButtonProps = {
  onClickHandler?: () => void;
}

export function LoadMoreButton({onClickHandler}: LoadMoreButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClickHandler}
      sx={{
        px: 4,
        py: 1,
        borderRadius: 2,
        fontWeight: 700,
        fontSize: 12,
        color: 'text.secondary',
        '&:hover': {
          color: 'primary.main',
          bgcolor: 'primary.50'
        }
      }}
    >
      Pokaż więcej ocen
    </Button>
  );
}
