import Box from "@mui/material/Box";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {CardLink} from "../../components/CardLink.tsx";

export function CardList() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap:3
      }}
    >
      <CardLink
        title="Oceny i analiza"
        href="/marks"
        icon={<AnalyticsIcon/>}
      />

      <CardLink
        title="Twoje dane"
        href="/student"
        icon={<AssignmentIndIcon />}
      />

      <CardLink
        title="Ogłoszenia"
        href="/"
        icon={<NewspaperIcon />}
      />
    </Box>
  )
}