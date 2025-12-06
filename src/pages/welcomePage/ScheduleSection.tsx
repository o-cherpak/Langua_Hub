import type {ICourse} from "../../interfaces/ICourse.ts";
import {SectionCard} from "../../components/SectionCard.tsx";
import {TodayActivity} from "./todayActivity/TodayActivity.tsx";
import {Button} from "@mui/material";

export function ScheduleSection({courses}: { courses: ICourse[] }) {
  return (
    <SectionCard>
      <TodayActivity courses={courses}/>

      <Button variant="text" sx={{mt: 2, borderRadius: 2, fontWeight: 600}}>
        Pełny harmonogram
      </Button>
    </SectionCard>
  );
}