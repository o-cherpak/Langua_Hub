import {get, ref} from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {IStudent} from "../interfaces/IStudent.ts";

interface StudentsState {
  students: IStudent[];
  loading: boolean;
  fetchStudents: () => Promise<void>;
  setStudents: (m: IStudent[]) => void;
}

export const useStudentsStore = create<StudentsState>((set) => ({
  students: [],
  loading: true,

  setStudents: (m) => set({students: m}),

  fetchStudents: async () => {
    set({loading: true});

    try {
      const studentsRef = ref(db, "students");
      const snap = await get(studentsRef);

      if (snap.exists()) {
        const val = snap.val();

        const transformed: IStudent[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            uid: key,
            ...value,
          }),
        );

        set({students: transformed, loading: false});
      } else {
        set({students: [], loading: false});
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      set({loading: false});
    }
  },
}));
