import Box from "@mui/material/Box";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import {CardLink} from "../../components/CardLink.tsx";

export function CardList() {
  return (
    <Box>
      <CardLink title={"Oceny i analiza"} href={"/"} icon={<AnalyticsIcon/>}/>

      <CardLink title={"Oceny i analiza"} href={"/"} icon={<AnalyticsIcon/>}/>

      <CardLink title={"Oceny i analiza"} href={"/"} icon={<AnalyticsIcon/>}/>
    </Box>
  )
}