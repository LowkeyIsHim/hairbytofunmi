"use client";
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useData();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-100">
        <h1 className="font-serif text-3xl mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition">
            Login
          </button>
          <p className="text-center text-xs text-stone-400 mt-4">
            (Demo Password: <strong>tofunmi123</strong>)
          </p>
        </form>
      </div>
    </div>
  );
}
