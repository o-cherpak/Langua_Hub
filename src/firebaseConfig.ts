import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: "fluencyportal-c01c1.firebaseapp.com",
  databaseURL:
    "https://fluencyportal-c01c1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fluencyportal-c01c1",
  storageBucket: "fluencyportal-c01c1.firebasestorage.app",
  messagingSenderId: "418675787644",
  appId: "1:418675787644:web:bf96849dd65bf9fb2a86f9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
