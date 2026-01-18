import {get, ref, push, set, update, remove} from "firebase/database";
import {create} from "zustand/react";
import {db} from "../firebaseConfig.ts";
import type {ICourse} from "../interfaces/ICourse.ts";
import {toast} from "react-hot-toast";

interface CoursesState {
  courses: ICourse[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  setCourses: (c: ICourse[]) => void;
  addCourse: (course: ICourse) => Promise<void>;
  updateCourse: (id: string, data: Partial<ICourse>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

export const useCoursesStore = create<CoursesState>((setStore) => ({
  courses: [],
  loading: false,

  fetchCourses: async () => {
    setStore({loading: true});
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
        setStore({courses: transformed, loading: false});
      } else {
        setStore({courses: [], loading: false});
      }
    } catch {
      toast.error("Błąd podczas pobierania kursów");
      setStore({loading: false});
    }
  },

  setCourses(courses) {
    setStore({courses: courses});
  },

  addCourse: async (courseData) => {
    const promise = (async () => {
      const newRef = push(ref(db, "courses"));
      const newId = newRef.key as string;

      await set(newRef, courseData);

      const fullCourse = {...courseData, id: newId};
      setStore((state) => ({courses: [...state.courses, fullCourse]}));
    })();

    return toast.promise(promise, {
      loading: "Tworzenie kursu...",
      success: "Kurs został pomyślnie utworzony!",
      error: "Nie udało się dodać kursu.",
    });
  },

  updateCourse: async (id, data) => {
    try {
      const cleanData = {...data};
      if (cleanData.id) delete cleanData.id;

      await update(ref(db, `courses/${id}`), cleanData);

      setStore((state) => ({
        courses: state.courses.map((c) => (c.id === id ? {...c, ...cleanData} : c)),
      }));

      toast.success("Kurs został zaktualizowany");
    } catch {
      toast.error("Błąd podczas edycji kursu");
    }
  },

  deleteCourse: async (id) => {
    try {
      await remove(ref(db, `courses/${id}`));
      setStore((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
      }));

      toast.success("Kurs został usunięty");
    } catch {
      toast.error("Błąd podczas usuwania kursu");
    }
  },
}));
