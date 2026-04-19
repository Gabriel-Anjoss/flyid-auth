import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebaseAuth";

export function useAuth() {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicia o listener — dispara sempre que o estado de auth muda
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Remove o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return { user, loading };
}