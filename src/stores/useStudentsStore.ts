import {create} from "zustand/react";
import type {IStudent} from "../interfaces/IStudent.ts";
import {get, ref} from "firebase/database";
import {auth, db} from "../firebaseConfig.ts";
import {onAuthStateChanged} from "firebase/auth";

interface StudentsState {
  user: IStudent | null;
  uid: string | null;
  loading: boolean;
  fetchUser: (uid: string) => Promise<void>;
  clearAuth: () => void;
  initializeAuth:() => void;
}

export const useStudentsStore = create<StudentsState>((set) => ({
  user: null,
  uid: null,
  loading: false,

  fetchUser: async (uid: string) => {
    set({ loading: true });
    const snap = await get(ref(db, `students/${uid}`));
    set({
      user: snap.exists() ? { ...snap.val(), id: uid } : null,
      uid: uid,
      loading: false
    });
  },

  clearAuth: () => set({ user: null, uid: null }),

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({uid: user.uid})
        await useStudentsStore.getState().fetchUser(user.uid);
      } else {
        useStudentsStore.getState().clearAuth();
      }
    });
    return unsubscribe;
  }
}));