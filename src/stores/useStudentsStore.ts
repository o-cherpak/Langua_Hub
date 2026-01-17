import {get, ref, set} from "firebase/database";
import {create} from "zustand/react";
import {db, firebaseConfig} from "../firebaseConfig.ts";
import type {IStudent} from "../interfaces/IStudent.ts";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {deleteApp, initializeApp} from "firebase/app";

interface StudentsState {
  students: IStudent[];
  loading: boolean;
  fetchStudents: () => Promise<void>;
  setStudents: (m: IStudent[]) => void;
  addStudent: (formData: any) => void;
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
    } catch (err) {
      console.error("Error fetching students:", err);
      setStore({loading: false});
    }
  },

  addStudent: async (formData: any) => {
    const tempApp = initializeApp(firebaseConfig, "TempApp");
    const tempAuth = getAuth(tempApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        tempAuth,
        formData.email,
        "password123"
      );

      const uid = userCredential.user.uid;
      
      const newStudentData = {
        uid: uid,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        role: "student",
        languages: []
      };

      await set(ref(db, `students/${uid}`), newStudentData);

      await signOut(tempAuth);
      await deleteApp(tempApp);

      setStore((state) => ({
        students: [...state.students, newStudentData]
      }));

      alert("Student dodany pomyślnie!");
    } catch (error: any) {
      console.error("Błąd podczas dodawania:", error);
      alert("Błąd: " + error.message);
    }
  }
}));
