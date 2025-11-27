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
      router.push("/admin/dashboard");
      toast.success("Welcome back, Tofunmi!");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-serif text-center mb-6">Admin Login</h1>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-brand-dark text-white p-3 rounded hover:bg-brand-800">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
