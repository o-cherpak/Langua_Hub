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
  loading: false,

  fetchUser: async (uid: string) => {
    set({loading: true});
    const snap = await get(ref(db, `students/${uid}`));
    set({
      user: snap.exists() ? {...snap.val(), id: uid} : null,
      uid: uid,
      loading: false,
    });
  },

  clearAuth: () => set({user: null, uid: null}),

  fetchUserRole: async (uid: string) => {
    try {
      const adminSnapshot = await get(ref(db, `admin/${uid}`));
      if (adminSnapshot.exists()) {
        set({role: "admin"});
        return "admin";
      }

      const teacherSnapshot = await get(ref(db, `teachers/${uid}`));
      if (teacherSnapshot.exists()) {
        set({role: "teacher"});
        return "teacher";
      }

      set({role: "student"});
      return "student";
    } catch (error) {
      set({role: null});
      console.log(error);
      return null;
    }
  },

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({uid: user.uid});
        await useUsersStore.getState().fetchUserRole(user.uid);

        set({ loading: false });
      } else {
        useUsersStore.getState().clearAuth();
        set({ role: null, loading: false });
      }
    });
    return unsubscribe;
  },


}));
