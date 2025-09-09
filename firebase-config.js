//firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
   getDocs,
  setDoc,
  updateDoc,
  Timestamp,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmR4AAqbuIPAHBSPfytSjuJGBsBK2uBb4",
  authDomain: "worksphere-bc2b2.firebaseapp.com",
  projectId: "worksphere-bc2b2",
  storageBucket: "worksphere-bc2b2.appspot.com",
  messagingSenderId: "802415630940",
  appId: "1:802415630940:web:47cde7c437d66e78826499"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  googleProvider,
  facebookProvider,
  db,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  onAuthStateChanged,
  updateProfile,
  signOut
};
