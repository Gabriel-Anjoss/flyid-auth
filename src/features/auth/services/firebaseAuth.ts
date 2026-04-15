import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAY7KE6PMjZ75_4FefH2hfmKQZU6nJMLj0",
  authDomain: "flyid-auth.firebaseapp.com",
  projectId: "flyid-auth",
  storageBucket: "flyid-auth.firebasestorage.app",
  messagingSenderId: "614613713068",
  appId: "1:614613713068:web:e7cb9d976adf006dda9f09",
};

// Inicializa app
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Login
export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};