import { Link, Stack } from "@mui/material";

const links = [
  { title: "Kursy", url: "#" },
  { title: "Lektorzy", url: "#" },
  { title: "O nas", url: "#" },
  { title: "Kontakt", url: "#" },
];

export function FooterLinks() {
  return (
    <Stack direction="row" spacing={4}>
      {links.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          underline="none"
          variant="body2"
          sx={{
            color: "text.primary",
            fontWeight: 500,
            transition: "0.2s",
            "&:hover": { color: "primary.main" },
          }}
        >
          {item.title}
        </Link>
      ))}
    </Stack>
  );
}
