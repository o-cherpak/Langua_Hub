import {useAnnouncementsStore} from "../../stores/useAnnouncementsStore.ts";
import {List} from "@mui/material";
import {AnnouncementItem} from "../../components/AnnouncementItem.tsx";

export function AnnouncementList() {
  const announcements = useAnnouncementsStore(state => state.announcements);
  const latestAnnouncements = announcements.slice(0,3);

  return (
    <List sx={{display: "flex", flexDirection: "column", width: "36%"}}>
      {latestAnnouncements && latestAnnouncements.map((announcement) => (
        <AnnouncementItem data={announcement} key={announcement.id}/>
      ))}
    </List>
  );
}
