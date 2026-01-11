import {Button} from "@mui/material";

type LoadMoreButtonProps = {
  onClickHandler?: () => void;
  title: string;
}

export function LoadMoreButton({title,onClickHandler}: LoadMoreButtonProps) {
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
      {title}
    </Button>
  );
}
