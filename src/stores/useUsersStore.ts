import {create} from "zustand/react";
import type {IStudent} from "../interfaces/IStudent.ts";
import {get, ref} from "firebase/database";
import {auth, db} from "../firebaseConfig.ts";
import {onAuthStateChanged} from "firebase/auth";

interface UserState {
  user: IStudent | null;
  uid: string | null;
  role: string | null;
  loading: boolean;
  fetchUser: (uid: string) => Promise<void>;
  fetchUserRole: (uid: string) => Promise<"admin" | "teacher" | "student" | null>;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useUsersStore = create<UserState>((set) => ({
  user: null,
  role: null,
  uid: null,
  loading: true,

  clearAuth: () => set({user: null, uid: null}),

  fetchUserRole: async (uid: string) => {
    try {
      const studentSnapshot = await get(ref(db, `students/${uid}`));
      if (studentSnapshot.exists()) {
        set({ role: "student" });
        return "student";
      }

      const teacherSnapshot = await get(ref(db, `teachers/${uid}`));
      if (teacherSnapshot.exists()) {
        set({ role: "teacher" });
        return "teacher";
      }

      const adminSnapshot = await get(ref(db, `admin/${uid}`));
      if (adminSnapshot.exists()) {
        set({ role: "admin" });
        return "admin";
      }

      set({ role: null });
      return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ role: "student" });
      return "student";
    }
  },

  initializeAuth: () => {
    set({ loading: true });

    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ uid: user.uid });
        const role = await useUsersStore.getState().fetchUserRole(user.uid);

        if (role === 'student') {
          await useUsersStore.getState().fetchUser(user.uid);
        }

        set({ loading: false });
      } else {
        useUsersStore.getState().clearAuth();
        set({ role: null, loading: false });
      }
    });
  },

  fetchUser: async (uid: string) => {
    const snap = await get(ref(db, `students/${uid}`));
    set({
      user: snap.exists() ? {...snap.val(), id: uid} : null,
      uid: uid,
    });
  },


}));
