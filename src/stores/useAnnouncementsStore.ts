import {get, ref} from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {IAnnouncement} from "../interfaces/IAnnouncement.ts";

interface AnnouncementState {
  announcements: IAnnouncement[];
  loading: boolean;
  fetchAnnouncement: () => Promise<void>;
  setAnnouncement: (c: IAnnouncement[]) => void;
}

export const useAnnouncementsStore = create<AnnouncementState>((set) => ({
  announcements: [],
  loading: false,

  setAnnouncement: (a => set({announcements: a})),

  fetchAnnouncement: async () => {
    set({loading: true});

    try {
      const snap = await get(ref(db, "announcements"));
      const val = snap.val() as IAnnouncement[];

      set({announcements: val, loading: false});
    } catch (err) {
      console.error("Error fetching announcement:", err);
      set({loading: false});
    }
  }
}))