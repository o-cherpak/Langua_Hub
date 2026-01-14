import Box from "@mui/material/Box";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { CardLink } from "../../components/CardLink.tsx";

const links = [
  { title: "Oceny i analiza", href: "/dashboard", icon: <AnalyticsIcon /> },
  { title: "Twoje dane", href: "/student", icon: <AssignmentIndIcon /> },
  { title: "Ogłoszenia", href: "/ann", icon: <NewspaperIcon /> },
];

export function CardList() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {links.map((link) => (
        <CardLink key={link.href} {...link} />
      ))}
    </Box>
  );
}
