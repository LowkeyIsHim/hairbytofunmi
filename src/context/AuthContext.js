// src/context/AuthContext.js (UPGRADED)

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false once state is determined
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

  return (
    // Pass user and loading state to children
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
