import {SectionCard} from "./SectionCard.tsx";
import {AnnouncementList} from "./announcement/AnnouncementList.tsx";
import {ViewAllButton} from "./buttons/ViewAllButton.tsx";
import {SectionTitle} from "./SectionTitle.tsx";
import {useAnnouncementsStore} from "../stores/useAnnouncementsStore.ts";

export function NewsSection() {
  const announcements = useAnnouncementsStore(state => state.announcements);

  return (
    <SectionCard>
      <SectionTitle title={"Ostatnie ogłoszenia"}/>

      <AnnouncementList announcements={announcements.slice(0, 5)}/>

      <ViewAllButton href={"/ann"} title={"Zobać wszystkie nowości"}/>
    </SectionCard>
  );
}