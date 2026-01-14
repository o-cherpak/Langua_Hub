import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

type StudentContactLinkProps = {
  href: string;
  title: string;
  info: string;
};

export function StudentContactLink({
  href,
  title,
  info,
}: StudentContactLinkProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {title}
      </Typography>

      <Typography
        variant="body1"
        component="a"
        href={href}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        {info}
      </Typography>
    </Box>
  );
}
