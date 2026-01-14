import { Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";

const icons = [
  { icon: <InstagramIcon />, color: "#E1306C" },
  { icon: <FacebookIcon />, color: "#1877F2" },
  { icon: <LinkedInIcon />, color: "#0077B5" },
];

export function FooterMedia() {
  return (
    <Stack direction="row" spacing={2}>
      {icons.map((social, index) => (
        <IconButton
          key={index}
          sx={{
            color: "grey.500",
            transition: "0.3s",
            "&:hover": { color: social.color, transform: "translateY(-4px)" },
          }}
        >
          {social.icon}
        </IconButton>
      ))}
    </Stack>
  );
}
