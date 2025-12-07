import {Button} from "@mui/material";
import {Link} from "react-router";

type ViewAllButtonProps = {
  title: string;
  href: string;
}

export function ViewAllButton({title, href}: ViewAllButtonProps) {
  return (
    <Button
      component={Link}
      to={href}
      variant="text"
      sx={{
        mt: 2,
        borderRadius: 2,
        fontWeight: 600,
      }}
    >
      {title}
    </Button>
  );
}
