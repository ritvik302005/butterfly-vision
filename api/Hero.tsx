import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Moon, Shield, Sun, UserRound, Users, X } from 'lucide-react';
import ButterflyBackground from './ButterflyBackground';
import BrandMark from './BrandMark';
import ProfileDashboard from './ProfileDashboard';

type AuthMode = 'signin' | 'signup';

interface AuthState {
  name: string;
  gender: string;
  email: string;
  password: string;
  mode: AuthMode;
}

const AUTH_STORAGE_KEY = 'butterfly:authUser';
const THEME_STORAGE_KEY = 'butterfly:theme';

function AuthModal({
  mode,
  onClose,
  onSubmit
}: {
  mode: AuthMode;
  onClose: () => void;
  onSubmit: (payload: AuthState) => void;
}) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const title = mode === 'signin' ? 'Sign In With Email' : 'Create Your Account';
  const buttonLabel = mode === 'signin' ? 'Sign In' : 'Sign Up';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      gender,
      email: email.trim(),
      password,
      mode
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/45 px-6">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl border border-brand-ink/5">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">
              Butterfly Vision Access
            </p>
            <h3 className="text-3xl font-serif">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brand-olive/10 transition-colors"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-ink/70 mb-2">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full rounded-2xl border border-brand-ink/10 px-4 py-3 outline-none focus:border-brand-olive"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-ink/70 mb-2">Gender</label>
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                required
                className="w-full rounded-2xl border border-brand-ink/10 px-4 py-3 outline-none focus:border-brand-olive bg-white"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-ink/70 mb-2">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-2xl border border-brand-ink/10 px-4 py-3 outline-none focus:border-brand-olive"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-ink/70 mb-2">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Create a password"
              required
              className="w-full rounded-2xl border border-brand-ink/10 px-4 py-3 outline-none focus:border-brand-olive"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-olive text-white px-6 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-olive/90 transition-all shadow-lg shadow-brand-olive/20"
          >
            {buttonLabel}
          </button>
        </form>

        <p className="mt-4 text-xs text-brand-ink/40 leading-relaxed">
          This profile system is designed for your project presentation and stores account data locally in the browser for a smooth demo flow.
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [authUser, setAuthUser] = useState<AuthState | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        setAuthUser(JSON.parse(saved));
      } catch {
        setAuthUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
    const nextTheme = savedTheme ?? 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  const handleAuthSubmit = (payload: AuthState) => {
    const normalizedPayload = {
      ...payload,
      name: payload.name || payload.email.split('@')[0],
      gender: payload.gender || 'Prefer not to say'
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalizedPayload));
    setAuthUser(normalizedPayload);
    setAuthMode(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthUser(null);
    setShowProfile(false);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ButterflyBackground />

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-brand-olive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-olive/10 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 p-8 flex justify-between items-center gap-6">
        <BrandMark />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-brand-ink/60">
          <a href="#classifier" className="hover:text-brand-olive transition-colors">Identify</a>
          <a href="#gallery" className="hover:text-brand-olive transition-colors">Explore</a>
          <a href="#about" className="hover:text-brand-olive transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="bg-white border border-brand-ink/10 px-4 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cream transition-all flex items-center gap-2"
            aria-label="Toggle dark mode"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          {authUser ? (
            <button
              onClick={() => setShowProfile(true)}
              className="w-12 h-12 rounded-full bg-brand-olive text-white flex items-center justify-center shadow-lg shadow-brand-olive/20"
              aria-label="Open profile dashboard"
              title="Open profile dashboard"
            >
              <UserRound className="w-6 h-6" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setAuthMode('signin')}
                className="bg-white border border-brand-ink/10 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cream transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className="bg-brand-olive text-white px-5 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-olive/90 transition-all shadow-lg shadow-brand-olive/20"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {authUser && (
            <p className="mb-6 text-sm uppercase tracking-[0.2em] font-bold text-brand-olive">
              Welcome {authUser.name}
            </p>
          )}
          <h1 className="text-7xl md:text-9xl font-serif leading-[0.85] mb-8 tracking-tight">
            Butterflies, <br />
            <span className="italic text-brand-olive">Beautifully Classified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-ink/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join a global community of citizen scientists. Use transfer learning to identify 75+ butterfly species instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#classifier"
              className="bg-brand-ink text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              Start Classifying <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#gallery"
              className="bg-white border border-brand-ink/10 px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-brand-cream transition-all"
            >
              View Gallery
            </a>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-brand-ink/5 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-brand-olive" />
            </div>
            <h3 className="font-serif text-xl mb-2">Conservation</h3>
            <p className="text-brand-ink/50 text-sm">Supporting habitat management and species inventory efforts.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-brand-ink/5 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-brand-olive" />
            </div>
            <h3 className="font-serif text-xl mb-2">Ecological Research</h3>
            <p className="text-brand-ink/50 text-sm">Tracking migratory patterns and environmental responses.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-brand-ink/5 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-brand-olive" />
            </div>
            <h3 className="font-serif text-xl mb-2">Citizen Science</h3>
            <p className="text-brand-ink/50 text-sm">Engaging enthusiasts in identification and data collection.</p>
          </div>
        </div>
      </main>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSubmit={handleAuthSubmit}
        />
      )}

      {authUser && showProfile && (
        <ProfileDashboard
          user={authUser}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
