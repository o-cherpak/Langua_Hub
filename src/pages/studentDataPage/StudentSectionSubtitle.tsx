import Typography from "@mui/material/Typography";

type StudentInfoSubTitleProps = {
  title: string;
};

export function StudentSectionSubtitle({ title }: StudentInfoSubTitleProps) {
  return (
    <Typography
      variant="subtitle2"
      color="primary"
      sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
    >
      {title}
    </Typography>
  );
}
