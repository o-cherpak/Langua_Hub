import {List} from "@mui/material";
import type {IAnnouncement} from "../interfaces/IAnnouncement.ts";
import {AnnouncementItem} from "./AnnouncementItem.tsx";

type AnnouncementListProps = {
  announcements: IAnnouncement[]
}

export function AnnouncementList({announcements}: AnnouncementListProps) {
  const reversedAnnouncements = [...announcements].reverse();

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
      }}
    >
      {reversedAnnouncements.map((announcement) => (
        <AnnouncementItem data={announcement} key={announcement.id}/>
      ))}
    </List>
  );
}