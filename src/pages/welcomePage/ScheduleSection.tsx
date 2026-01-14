import type {ICourse} from "../../interfaces/ICourse.ts";
import {SectionCard} from "../../components/SectionCard.tsx";
import {TodayActivity} from "./todayActivity/TodayActivity.tsx";
import {ViewAllButton} from "../../components/buttons/ViewAllButton.tsx";

export function ScheduleSection({courses}: { courses: ICourse[] }) {
  return (
    <SectionCard>
      <TodayActivity courses={courses}/>

      <ViewAllButton href={'/calendarPage'} title={"Pełny harmonogram"}/>
    </SectionCard>
  );
}