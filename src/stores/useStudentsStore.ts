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
    // 1. Створюємо окремий екземпляр додатка, щоб не вилогінити адміна
    const tempApp = initializeApp(firebaseConfig, "TempApp");
    const tempAuth = getAuth(tempApp);

    try {
      // 2. Реєструємо юзера в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        tempAuth,
        formData.email,
        "password123" // Тимчасовий пароль (краще генерувати)
      );

      const uid = userCredential.user.uid;

      // 3. Готуємо дані для бази
      const newStudentData = {
        uid: uid,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        role: "student",
        languages: [] // порожній масив на старті
      };

      // 4. Записуємо в Realtime Database
      await set(ref(db, `students/${uid}`), newStudentData);

      // 5. Вилогінюємо "тимчасового" юзера і видаляємо тимчасовий додаток
      await signOut(tempAuth);
      await deleteApp(tempApp);

      // 6. ОНОВЛЮЄМО ЛОКАЛЬНИЙ СТОР (щоб таблиця оновилася без F5)
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
