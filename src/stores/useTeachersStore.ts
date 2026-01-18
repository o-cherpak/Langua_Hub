import {get, ref, remove, set, update} from "firebase/database";
import { create } from "zustand/react";
import { db, firebaseConfig } from "../firebaseConfig.ts";
import type { ITeacher } from "../interfaces/ITeacher.ts";
import {deleteApp, initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

interface TeachersState {
  teachers: ITeacher[];
  loading: boolean;
  fetchTeachers: () => Promise<void>;
  setTeachers: (t: ITeacher[]) => void;
  addTeacher: (formData: ITeacher) => Promise<void>;
  updateTeacher: (uid: string, data: Partial<ITeacher>) => Promise<void>;
  deleteTeacher: (uid: string) => Promise<void>;
}

export const useTeachersStore = create<TeachersState>((setStore) => ({
  teachers: [],
  loading: false,

  setTeachers: (t) => setStore({ teachers: t }),

  fetchTeachers: async () => {
    setStore({ loading: true });

    try {
      const snap = await get(ref(db, "teachers"));
      const val = snap.val() as ITeacher[];

      if (val) {
        const transformed: ITeacher[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            uid: key,
          }),
        );

        setStore({ teachers: transformed, loading: false });
      } else {
        setStore({ teachers: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setStore({ loading: false });
    }
  },

  addTeacher: async (formData: ITeacher) => {
    const tempApp = initializeApp(firebaseConfig, "TempTeacherApp");
    const tempAuth = getAuth(tempApp);

    try {
      const emailPrefix = formData.email.split("@")[0];
      const generatedPassword = `${emailPrefix}123`;

      const userCredential = await createUserWithEmailAndPassword(
        tempAuth,
        formData.email,
        generatedPassword
      );

      const uid = userCredential.user.uid;

      const newTeacherData: ITeacher = {
        uid: uid,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        role: "teacher",
        specialization: formData.specialization || "",
      };

      await set(ref(db, `teachers/${uid}`), newTeacherData);

      await signOut(tempAuth);
      await deleteApp(tempApp);

      setStore((state) => ({
        teachers: [...state.teachers, { ...newTeacherData, uid }]
      }));
    } catch (error: any) {
      alert("Błąd: " + error.message);
    }
  },

  updateTeacher: async (uid, data) => {
    const { uid: _, ...cleanData } = data as ITeacher;
    await update(ref(db, `teachers/${uid}`), cleanData);

    setStore((state) => ({
      teachers: state.teachers.map((t) => (t.uid === uid ? { ...t, ...cleanData } : t)),
    }));
  },

  deleteTeacher: async (uid) => {
    await remove(ref(db, `teachers/${uid}`));
    setStore((state) => ({
      teachers: state.teachers.filter((t) => t.uid !== uid),
    }));
  }
}));
