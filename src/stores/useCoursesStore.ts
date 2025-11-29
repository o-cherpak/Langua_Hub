import { get, ref } from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {ICourse} from "../interfaces/ICourse.ts";

interface CoursesState {
  courses: ICourse[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  setCourses: (c: ICourse[]) => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  loading: false,

  setCourses: (c => set({courses: c})),

  fetchCourses: async () => {
    set({loading: true});

    try {
      const snap = await get(ref(db, "courses"));
      const val = snap.val() as ICourse[];

      set({courses: val, loading: false});
    } catch (err) {
      console.error("Error fetching courses:", err);
      set({loading: false});
    }
  }

}))