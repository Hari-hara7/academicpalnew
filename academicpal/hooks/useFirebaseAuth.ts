import { useState, useEffect } from "react";
import { authA, providerA } from "../services/firebaseConfig";  // Adjust path as needed
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const useFirebaseAuth = () => {
  const [user, setUser] = useState<any>(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authA, providerA);
      if (!result.user.email?.endsWith("@nmamit.in")) {
        alert("Only @nmamit.in emails are allowed.");
        await signOut(authA);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOutUser = async () => {
    await signOut(authA);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authA, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return { user, signInWithGoogle, signOutUser };
};

export default useFirebaseAuth;
