import {SectionCard} from "./SectionCard.tsx";
import {AnnouncementList} from "../pages/welcomePage/AnnouncementList.tsx";
import {ViewAllButton} from "./ViewAllButton.tsx";
import {SectionTitle} from "./SectionTitle.tsx";

export function NewsSection() {
  return (
    <SectionCard>
      <SectionTitle title={"Ostatnie ogłoszenia"}/>

      <AnnouncementList/>

      <ViewAllButton href={"/"} title={"Zobać wszystkie nowości"}/>
    </SectionCard>
  );
}