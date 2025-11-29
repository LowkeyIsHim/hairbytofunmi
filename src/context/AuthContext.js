"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import db here

const AuthContext = createContext({
  user: null,
  userId: null,
  loading: true, 
  db: null, // CRITICAL: Added db to context definition
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Handle Initial Canvas Authentication (Custom Token/Anonymous)
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    const authenticate = async () => {
        try {
            if (initialAuthToken) {
                // Mandatory sign-in with custom token
                await signInWithCustomToken(auth, initialAuthToken);
                console.log("Firebase: Signed in with custom token.");
            } else {
                // Fallback to anonymous sign-in
                await signInAnonymously(auth);
                console.log("Firebase: Signed in anonymously.");
            }
        } catch (error) {
            console.error("Firebase Auth Error during initial sign-in:", error);
        }
    };
    
    // Start authentication flow
    authenticate();

    // 2. Listen for Auth State Changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false once state is determined after initial check
    });

    return () => unsubscribe();
  }, []); 

  // Show a simple loading spinner during the initial Firebase check.
  if (loading) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-brand-cream dark:bg-brand-dark">
           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-gold"></div>
        </div>
    );
  }

  const userId = user?.uid || crypto.randomUUID();

  return (
    // CRITICAL: Pass db, user, and the current loading/ready state
    <AuthContext.Provider value={{ user, userId, loading, db }}>
      {children}
    </AuthContext.Provider>
  );
};
