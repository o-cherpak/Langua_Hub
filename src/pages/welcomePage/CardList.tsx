import Box from "@mui/material/Box";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {CardLink} from "../../components/CardLink.tsx";

export function CardList() {
  return (
    <Box>
      <CardLink title={"Oceny i analiza"} href={"/"} icon={<AnalyticsIcon/>}/>

      <CardLink title={"Twoje dane"} href={"/"} icon={<AssignmentIndIcon/>}/>

      <CardLink title={"Ogłoszenia"} href={"/"} icon={<NewspaperIcon/>}/>
    </Box>
  )
}