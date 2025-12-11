import {Typography} from "@mui/material";

type SectionTitleProps = {
  title: string,
  center?: boolean,
}

export function SectionTitle({title, center}: SectionTitleProps) {
  const align = center ? "center" : "left";

  return (
    <Typography variant="h5" sx={{fontWeight: 700, textAlign: align}}>
      {title}
    </Typography>
  );
}
