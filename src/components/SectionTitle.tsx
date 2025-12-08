import {Typography} from "@mui/material";

type SectionTitleProps = {
  title: string,
}

export function SectionTitle({title}: SectionTitleProps) {
  return (
    <Typography variant="h5" sx={{fontWeight: 700}}>
      {title}
    </Typography>
  );
}
