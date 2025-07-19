import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKo0iUj9Z7nTpOeGVCdFDPlRwK8m9j-rM",
  authDomain: "motorvault-e04a5.firebaseapp.com",
  projectId: "motorvault-e04a5",
  storageBucket: "motorvault-e04a5.firebasestorage.app",
  messagingSenderId: "449102501500",
  appId: "1:449102501500:web:d64a67fd3df942ee2f5bf9",
  measurementId: "G-KGGS45SSYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Make sure the 'export' keyword is here
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);