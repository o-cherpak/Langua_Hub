import { get, ref, push, set, update, remove } from "firebase/database";
import { create } from "zustand";
import { db } from "../firebaseConfig.ts";
import type { IAnnouncement } from "../interfaces/IAnnouncement.ts";
import { toast } from "react-hot-toast";

interface AnnouncementState {
  announcements: IAnnouncement[];
  loading: boolean;
  fetchAnnouncement: () => Promise<void>;
  setAnnouncement: (c: IAnnouncement[]) => void;
  addAnnouncement: (data: IAnnouncement) => Promise<void>;
  updateAnnouncement: (id: string, data: Partial<IAnnouncement>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
}

export const useAnnouncementsStore = create<AnnouncementState>((setStore) => ({
  announcements: [],
  loading: false,

  setAnnouncement: (a) => setStore({ announcements: a }),

  fetchAnnouncement: async () => {
    setStore({ loading: true });

    try {
      const snap = await get(ref(db, "announcements"));
      const val = snap.val();

      if (val) {
        const transformed: IAnnouncement[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            id: key,
          }),
        );

        setStore({ announcements: transformed, loading: false });
      } else {
        setStore({ announcements: [], loading: false });
      }
    } catch {
      toast.error("Błąd podczas pobierania ogłoszeń ");
      setStore({ loading: false });
    }
  },

  addAnnouncement: async (data) => {
    const promise = (async () => {
      const newRef = push(ref(db, "announcements"));
      const newId = newRef.key as string;
      await set(newRef, data);
      setStore((state) => ({
        announcements: [{...data, id: newId}, ...state.announcements]
      }));
    })();

    return toast.promise(promise, {
      loading: 'Publikowanie ogłoszenia...',
      success: 'Ogłoszenie zostało opublikowane!',
      error: 'Nie udało się dodać ogłoszenia.',
    });
  },

  updateAnnouncement: async (id, data) => {
    const cleanData = { ...data };

    if (cleanData.id) delete cleanData.id;
    await update(ref(db, `announcements/${id}`), cleanData);
    setStore((state) => ({
      announcements: state.announcements.map((a) => (a.id === id ? { ...a, ...cleanData } : a)),
    }));
  },

  deleteAnnouncement: async (id) => {
    await remove(ref(db, `announcements/${id}`));
    setStore((state) => ({
      announcements: state.announcements.filter((a) => a.id !== id),
    }));
  },
}));
