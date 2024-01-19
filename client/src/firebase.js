// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "patidarestate.firebaseapp.com",
  projectId: "patidarestate",
  storageBucket: "patidarestate.appspot.com",
  messagingSenderId: "724878984557",
  appId: "1:724878984557:web:3bb509a59624ea94048664",
  measurementId: "G-FZCZ793MV0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);