import { get, ref } from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {IMark} from "../interfaces/IMark.ts";

interface MarksState {
  marks: IMark[];
  loading: boolean;
  fetchMarks: () => Promise<void>;
  setMarks: (m: IMark[]) => void;
}

export const useMarksStore = create<MarksState>((set) => ({
  marks: [],
  loading: false,

  setMarks: (m => set({marks: m})),

  fetchMarks: async () => {
    set({loading: true});

    try {
      const snap = await get(ref(db, "marks"));
      const val = snap.val() as IMark[];

      set({marks: val, loading: false});
    } catch (err) {
      console.error("Error fetching marks:", err);
      set({loading: false});
    }
  }

}))