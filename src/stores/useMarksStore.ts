import {equalTo, get, orderByChild, query, ref } from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {IMark} from "../interfaces/IMark.ts";

interface MarksState {
  marks: IMark[];
  loading: boolean;
  fetchMarks: (uid: string) => Promise<void>;
  setMarks: (m: IMark[]) => void;
}

export const useMarksStore = create<MarksState>((set) => ({
  marks: [],
  loading: false,

  setMarks: (m => set({marks: m})),

  fetchMarks: async (uid) => {
    set({loading: true});

    try {
      const marksRef = ref(db, "marks");
      const marksQuery = query(
        marksRef,
        orderByChild("studentId"),
        equalTo(uid)
      );

      const snap = await get(marksQuery);

      if (snap.exists()) {
        const val = snap.val();

        const transformed: IMark[] = Object.entries(val).map(([key, value]: [string, any]) => ({
          ...value,
          id: key,
        }));

        set({ marks: transformed, loading: false });
      } else {
        set({ marks: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching marks:", err);
      set({loading: false});
    }
  }

}))