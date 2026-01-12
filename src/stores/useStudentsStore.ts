import {get, ref} from "firebase/database";
import type {IStudent} from "../interfaces/IStudent.ts";
import {create} from "zustand/react";
import {auth, db} from "../firebaseConfig.ts";
import {onAuthStateChanged} from "firebase/auth";
import {getIdByEmail} from "../services/getIdByEmail.ts";

interface StudentsState {
  students: IStudent[];
  currentStudent: IStudent | null;
  fetchCurrentStudent: (uid: string) => Promise<void>;
  loading: boolean;
  fetchStudents: () => Promise<void>;
  setStudents: (s: IStudent[]) => void;
  currentUserId: string | null;
  setCurrentUserId: (id: string | null) => void;
  initializeAuth: () => void;
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

      if (val) {
        const transformed: IStudent[] = Object.entries(val).map(([key, value]: [string, any]) => ({
          ...value,
          id: key,
        }));

        set({ students: transformed, loading: false });
      } else {
        set({ students: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      set({loading: false});
    }
  },

  fetchCurrentStudent: async (uid: string) => {
    set({ loading: true });
    try {
      const studentRef = ref(db, `students/${uid}`);
      const snap = await get(studentRef);

      if (snap.exists()) {
        set(
          {
            currentStudent: { ...snap.val(), id: uid },
            loading: false,
            currentUserId: uid
          });
      } else {
        set({ currentStudent: null, loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  currentUserId: null,

  setCurrentUserId: (id => set({currentUserId: id})),

  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const students = useStudentsStore.getState().students;
        const userId = getIdByEmail({ list: students, email: user.email });

        set({ currentUserId: userId });
      } else {
        set({ currentUserId: null });
      }
    })}
}))