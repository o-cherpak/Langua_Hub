import { get, ref } from "firebase/database";
import { create } from "zustand/react";
import { db } from "../firebaseConfig.ts";
import type { ICourse } from "../interfaces/ICourse.ts";

interface CoursesState {
  courses: ICourse[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  setCourses: (c: ICourse[]) => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  loading: false,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const snap = await get(ref(db, "courses"));
      const val = snap.val();

      if (val) {
        const transformed: ICourse[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            id: key,
          }),
        );
        set({ courses: transformed, loading: false });
      } else {
        set({ courses: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      set({ loading: false });
    }
  },

  setCourses(courses) {
    set({ courses: courses });
  },
}));
