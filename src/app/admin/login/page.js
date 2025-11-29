// src/app/admin/login/page.js (UPGRADED)

"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The AdminLayout will handle the redirect to dashboard once user state is updated
      toast.success("Welcome back, Tofunmi!");
    } catch (error) {
      toast.error("Invalid credentials or error logging in.");
    }
  };

  return (
    // Background uses the VVIP colors
    <div className="min-h-screen flex items-center justify-center bg-brand-cream dark:bg-brand-dark transition-colors duration-500">
      <form onSubmit={handleLogin} className="bg-white dark:bg-brand-dark/90 p-10 shadow-2xl rounded-lg w-full max-w-sm border border-brand-gold/20 transition-colors">
        <h1 className="text-3xl font-serif text-center mb-8 text-brand-dark dark:text-brand-cream">
            Admin Access
        </h1>
        <div className="space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border border-brand-charcoal/20 dark:border-brand-cream/10 bg-transparent p-3 rounded-sm text-brand-dark dark:text-brand-cream placeholder:text-brand-charcoal/50 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border border-brand-charcoal/20 dark:border-brand-cream/10 bg-transparent p-3 rounded-sm text-brand-dark dark:text-brand-cream placeholder:text-brand-charcoal/50 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-brand-dark dark:bg-brand-gold text-brand-cream dark:text-brand-dark p-3 rounded-sm uppercase tracking-widest font-bold hover:opacity-90 transition-opacity duration-300"
          >
            Authenticate
          </button>
        </div>
      </form>
    </div>
  );
}
