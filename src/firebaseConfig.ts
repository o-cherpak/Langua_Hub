import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAH3jW-eroMvPUWoR6gBaYQ0UI0HU3oAxA",
  authDomain: "fluencyportal-c01c1.firebaseapp.com",
  databaseURL: "https://fluencyportal-c01c1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fluencyportal-c01c1",
  storageBucket: "fluencyportal-c01c1.firebasestorage.app",
  messagingSenderId: "418675787644",
  appId: "1:418675787644:web:638db57eb47d6aa42a86f9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);