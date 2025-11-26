"use client";
import { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useData();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/admin');
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-primary/80"
      >
        <div className="text-center mb-6">
            <Lock className="w-10 h-10 text-primary mx-auto mb-2" />
            <h1 className="font-serif text-3xl text-dark">Stylist Access</h1>
            <p className="text-sm text-stone-500">Secure administration panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition shadow-md">
            Login
          </button>
          <p className="text-center text-xs text-stone-400 mt-4">
            (Demo Password: **Tofunmi2025!**)
          </p>
        </form>
      </motion.div>
    </div>
  );
}
