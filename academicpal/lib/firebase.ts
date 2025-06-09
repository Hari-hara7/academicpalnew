// lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCp7culM97yeWN2GFZjk47sqlu0YaHQR2o",
  authDomain: "tail-44bd6.firebaseapp.com",
  databaseURL: "https://tail-44bd6-default-rtdb.firebaseio.com",
  projectId: "tail-44bd6",
  storageBucket: "tail-44bd6.appspot.com",
  messagingSenderId: "92562125471",
  appId: "1:92562125471:web:e55634f4994ad3c4a1a8aa",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const provider = new GoogleAuthProvider();


const db = getFirestore(app);




export {
  auth,
  db,
  googleProvider,
  githubProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
