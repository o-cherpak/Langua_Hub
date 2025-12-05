import {get, ref} from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {IAnnouncement} from "../interfaces/IAnnouncement.ts";

interface AnnouncementState {
  announcement: IAnnouncement[];
  loading: boolean;
  fetchAnnouncement: () => Promise<void>;
  setAnnouncement: (c: IAnnouncement[]) => void;
}

export const useAnnouncementsStore = create<AnnouncementState>((set) => ({
  announcement: [],
  loading: false,

  setAnnouncement: (a => set({announcement: a})),

  fetchAnnouncement: async () => {
    set({loading: true});

    try {
      const snap = await get(ref(db, "announcement"));
      const val = snap.val() as IAnnouncement[];

      set({announcement: val, loading: false});
    } catch (err) {
      console.error("Error fetching announcement:", err);
      set({loading: false});
    }
  }
}))