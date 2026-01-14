import { get, ref } from "firebase/database";
import { create } from "zustand/react";
import { db } from "../firebaseConfig.ts";
import type { ITeacher } from "../interfaces/ITeacher.ts";

interface TeachersState {
  teachers: ITeacher[];
  loading: boolean;
  fetchTeachers: () => Promise<void>;
  setTeachers: (t: ITeacher[]) => void;
}

export const useTeachersStore = create<TeachersState>((set) => ({
  teachers: [],
  loading: false,

  setTeachers: (t) => set({ teachers: t }),

  fetchTeachers: async () => {
    set({ loading: true });

    try {
      const snap = await get(ref(db, "teachers"));
      const val = snap.val() as ITeacher[];

      if (val) {
        const transformed: ITeacher[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            id: key,
          }),
        );

        set({ teachers: transformed, loading: false });
      } else {
        set({ teachers: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching teachers:", err);
      set({ loading: false });
    }
  },
}));
