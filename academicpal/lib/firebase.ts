import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

// Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCp7culM97yeWN2GFZjk47sqlu0YaHQR2o",
  authDomain: "tail-44bd6.firebaseapp.com",
  projectId: "tail-44bd6",
  storageBucket: "tail-44bd6.firebasestorage.app",
  messagingSenderId: "92562125471",
  appId: "1:92562125471:web:e55634f4994ad3c4a1a8aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };
