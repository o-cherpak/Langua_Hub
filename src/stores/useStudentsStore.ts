import { get, ref } from "firebase/database";
import type {IStudent} from "../interfaces/IStudent.ts";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";

interface StudentsState {
  students: IStudent[];
  loading: boolean;
  fetchStudents: () => Promise<void>;
  setStudents: (s: IStudent[]) => void;
}

export const useStudentsStore = create<StudentsState>((set) => ({
  students: [],
  loading: false,

  setStudents: (s => set({students: s})),

  fetchStudents: async () => {
    set({loading: true});

    try {
      const snap = await get(ref(db, "students"));
      const val = snap.val() as IStudent[];

      set({students: val, loading: false});
    } catch (err) {
      console.error("Error fetching students:", err);
      set({loading: false});
    }
  }

  }))