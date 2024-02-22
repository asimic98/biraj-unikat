import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARIkKMUcFcuZ6TBkTdCA2oJ7zhPzgMMPg",
  authDomain: "biraj-unikat.firebaseapp.com",
  projectId: "biraj-unikat",
  storageBucket: "biraj-unikat.appspot.com",
  messagingSenderId: "53824425439",
  appId: "1:53824425439:web:9f0733dfbda4966b57c86a",
  measurementId: "G-1ESM2ZGH7J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvaider = new GoogleAuthProvider();
