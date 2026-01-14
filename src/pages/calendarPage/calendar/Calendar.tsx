import {CalendarHeader} from "./CalendarHeader.tsx";
import {CalendarGrid} from "./CalendarGrid.tsx";
import {SectionCard} from "../../../components/SectionCard.tsx";

interface Props {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({selectedDate, onDateSelect}: Props) {
  return (
      <SectionCard>
        <CalendarHeader/>

        <CalendarGrid selectedDate={selectedDate} onDateSelect={onDateSelect}/>
      </SectionCard>
  );
}