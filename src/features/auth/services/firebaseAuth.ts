import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Configuração do Firebase via variáveis de ambiente
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Instância de autenticação
export const auth = getAuth(app);

// Realiza login com e-mail e senha
export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Envia e-mail de redefinição de senha
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};