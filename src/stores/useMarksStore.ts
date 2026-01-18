import { get, ref, push, set, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { create } from "zustand";
import { db } from "../firebaseConfig.ts";
import type {IMark} from "../interfaces/IMark.ts";

interface MarksState {
  marks: IMark[];
  loading: boolean;
  fetchMarks: (uid: string) => Promise<void>;
  fetchAllMarks: () => Promise<void>;
  setMarks: (m: IMark[]) => void;
  addMark: (markData: IMark) => Promise<void>;
  updateMark: (id: string, data: Partial<IMark>) => Promise<void>;
  deleteMark: (id: string) => Promise<void>;
}

export const useMarksStore = create<MarksState>((setStore) => ({
  marks: [],
  loading: false,

  setMarks: (m) => setStore({ marks: m }),

  fetchMarks: async (uid) => {
    setStore({ loading: true });

    try {
      const marksRef = ref(db, "marks");
      const marksQuery = query(
        marksRef,
        orderByChild("studentId"),
        equalTo(uid),
      );

      const snap = await get(marksQuery);

      if (snap.exists()) {
        const val = snap.val();

        const transformed: IMark[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            id: key,
          }),
        );

        setStore({ marks: transformed, loading: false });
      } else {
        setStore({ marks: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching marks:", err);
      setStore({ loading: false });
    }
  },

  fetchAllMarks: async () => {
    setStore({ loading: true });

    try {
      const marksRef = ref(db, "marks");
      const snap = await get(marksRef);

      if (snap.exists()) {
        const val = snap.val();

        const transformed: IMark[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            id: key,
          }),
        );

        setStore({ marks: transformed, loading: false });
      } else {
        setStore({ marks: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching marks:", err);
      setStore({ loading: false });
    }
  },

  addMark: async (markData) => {
    try {
      const newMarkRef = push(ref(db, "marks"));
      const newId = newMarkRef.key as string;

      const fullMark = { ...markData, id: newId };
      await set(newMarkRef, fullMark);

      setStore((state) => ({
        marks: [...state.marks, fullMark],
      }));
    } catch (err) {
      console.error("Błąd dodawania:", err);
    }
  },

  updateMark: async (id, data) => {
    try {
      const cleanData = { ...data };
      delete cleanData.id;

      await update(ref(db, `marks/${id}`), cleanData);

      setStore((state) => ({
        marks: state.marks.map((m) =>
          m.id === id ? { ...m, ...cleanData } : m
        ),
      }));
    } catch (err) {
      console.error("Błąd aktualizacji:", err);
    }
  },

  deleteMark: async (id) => {
    try {
      await remove(ref(db, `marks/${id}`));
      setStore((state) => ({
        marks: state.marks.filter((m) => m.id !== id),
      }));
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  },
}));
