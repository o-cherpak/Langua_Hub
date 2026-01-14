import {useState} from 'react';
import {Container, Grid, Box} from '@mui/material';

import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {Calendar} from "./calendar/Calendar.tsx";
import {SectionTitle} from "../../components/SectionTitle.tsx";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {pl} from "date-fns/locale";

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2024-01-15"));
  const dayName = format(selectedDate, "LLLL yyyy", {locale: pl}).toUpperCase();

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa'}}>
      <Header/>

      <Container maxWidth="xl" sx={{flexGrow: 1}}>

        <Grid container spacing={5}>
          <Grid size={{xs: 12, md: 6}} sx={{py: 4}}>
            <Box
              sx={{
                display: "flex",
                alignItems: 'baseline',
                justifyContent: 'space-between',
                px: 2,
                pb: 1
              }}
            >
              <SectionTitle title={"Plany zajęć"}/>

              <Typography variant="body2" component="p" sx={{fontWeight: 'bold', color: "primary.main"}}>
                {dayName}
              </Typography>
            </Box>

            <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate}/>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </Box>
  )
}