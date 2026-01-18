import {get, ref, remove, set, update} from "firebase/database";
import {create} from "zustand/react";
import {db, firebaseConfig} from "../firebaseConfig.ts";
import type {ITeacher} from "../interfaces/ITeacher.ts";
import {deleteApp, initializeApp} from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {toast} from "react-hot-toast";

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

  setTeachers: (t) => setStore({teachers: t}),

  fetchTeachers: async () => {
    setStore({loading: true});

    try {
      const snap = await get(ref(db, "teachers"));
      const val = snap.val();

      if (val) {
        const transformed: ITeacher[] = Object.entries(val).map(
          ([key, value]: [string, any]) => ({
            ...value,
            uid: key,
          }),
        );
        setStore({teachers: transformed, loading: false});
      } else {
        setStore({teachers: [], loading: false});
      }
    } catch (err) {
      toast.error("Błąd podczas pobierania wykład...");
      setStore({loading: false});
    }
  },

  addTeacher: async (formData: ITeacher) => {
    const addProcess = (async () => {
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
          teachers: [...state.teachers, {...newTeacherData, uid}]
        }));

        return `Nauczyciel dodany!`;
      } catch (error: any) {
        await deleteApp(tempApp);
        throw error;
      }
    })();

    toast.promise(addProcess, {
      loading: "Tworzenie konta nauczyciela...",
      success: (msg) => msg,
      error: (err) => `Błąd: ${err.message}`,
    }, {
      duration: 5000
    });
  },

  updateTeacher: async (uid, data) => {
    try {
      const cleanData = {...data};
      if (cleanData.uid) delete cleanData.uid;

      await update(ref(db, `teachers/${uid}`), cleanData);

      setStore((state) => ({
        teachers: state.teachers.map((t) => (t.uid === uid ? {...t, ...cleanData} : t)),
      }));

      toast.success("Dane nauczyciela zostały zaktualizowane!");
    } catch (error: any) {
      toast.error("Błąd aktualizacji: " + error.message);
    }
  },

  deleteTeacher: async (uid) => {
    try {
      await remove(ref(db, `teachers/${uid}`));
      setStore((state) => ({
        teachers: state.teachers.filter((t) => t.uid !== uid),
      }));
      toast.success("Nauczyciel został usunięty");
    } catch (error: any) {
      toast.error("Nie udało się usunąć nauczyciela");
    }
  }
}));