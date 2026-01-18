import {get, ref, remove, set, update} from "firebase/database";
import {create} from "zustand/react";
import {db, firebaseConfig} from "../firebaseConfig.ts";
import type {IStudent} from "../interfaces/IStudent.ts";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {deleteApp, initializeApp} from "firebase/app";
import {toast} from "react-hot-toast";

interface StudentsState {
  students: IStudent[];
  loading: boolean;
  fetchStudents: () => Promise<void>;
  setStudents: (m: IStudent[]) => void;
  addStudent: (formData: IStudent) => Promise<void>;
  updateStudent: (uid: string, data: IStudent) => Promise<void>;
  deleteStudent:(uid: string) => Promise<void>;
}

export const useStudentsStore = create<StudentsState>((setStore) => ({
  students: [],
  loading: true,

  setStudents: (m) => setStore({students: m}),

  fetchStudents: async () => {
    setStore({loading: true});

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

        setStore({students: transformed, loading: false});
      } else {
        setStore({students: [], loading: false});
      }
    } catch {
      toast.error("Błąd podczas pobierania studentów");
      setStore({loading: false});
    }
  },

  addStudent: async (formData: IStudent) => {
    const addAction = (async () => {
      const tempApp = initializeApp(firebaseConfig, "TempApp");
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

        const newStudentData = {
          uid: uid,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          role: "student",
          languages: formData.languages || []
        };

        await set(ref(db, `students/${uid}`), newStudentData);
        await signOut(tempAuth);
        await deleteApp(tempApp);

        setStore((state) => ({
          students: [...state.students, newStudentData]
        }));

        return `Student dodany! Hasło: ${generatedPassword}`;
      } catch  {
        await deleteApp(tempApp);
        return `Вłąd dodawania studenta`;
      }
    })();

    await toast.promise(addAction, {
      loading: 'Tworzenie konta studenta...',
      success: (msg) => msg,
      error: (err) => `Błąd: ${err.message}`,
    }, {
      duration: 6000
    });
  },

  updateStudent: async (uid: string, data: IStudent) => {
    try{
      await update(ref(db, `students/${uid}`), data);

      setStore((state) => ({
        students: state.students.map((student) =>
          student.uid === uid
            ? {...student, ...data}
            : student
        ),
      }));

      toast.success("Dane studenta zostały zaktualizowane");
    } catch (error: any) {
      toast.error("Błąd aktualizacji: " + error.message);
    }
  },

  deleteStudent: async (uid: string) => {
    try {
      const studentRef = ref(db, `students/${uid}`);
      await remove(studentRef);

      setStore((state) => ({
        students: state.students.filter((student) => student.uid !== uid),
      }));

      toast.success("Student został usunięty");
    } catch {
      toast.error("Nie udało się usunąć studenta");
    }
  },
}));
