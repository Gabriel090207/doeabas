import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWkuDvAVSkle55i5o3hmqQ5dBFj_gax84",
  authDomain: "abas-database-1cfce.firebaseapp.com",
  projectId: "abas-database-1cfce",
  storageBucket: "abas-database-1cfce.firebasestorage.app",
  messagingSenderId: "522165487780",
  appId: "1:522165487780:web:60c0345f8553714e663e31",
  measurementId: "G-YLQGG4HNRC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;