'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail, Loader2, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Send the magic link
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        }
      });

      if (magicLinkError) {
        throw magicLinkError;
      }

      setMessage('Success! Check your email for the magic link to log in.');

    } catch (err) {
      console.error('Login Error:', err);
      setError('Failed to send magic link. Please check the email and ensure it is registered in Supabase Auth.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-premium border-t-8 border-soft-gold animate-fadeIn">
        <div className='flex items-center justify-center mb-6 text-muted-lavender'>
          <Lock size={32} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-center text-deep-violet mb-2">
          Admin Login
        </h1>
        <p className="text-center text-deep-violet/70 mb-8">
          Enter your email to receive a secure magic link.
        </p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@hairbytofunmi.com"
            required
            className="w-full"
          />
          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
          >
            <Mail className='h-5 w-5 mr-2' />
            Send Magic Link
          </Button>
        </form>
      </div>
    </div>
  );
}
