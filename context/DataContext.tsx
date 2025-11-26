"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HairStyle, INITIAL_STYLES } from '@/lib/initialData';

interface DataContextType {
  styles: HairStyle[];
  addStyle: (style: HairStyle) => void;
  deleteStyle: (id: string) => void;
  updateStyle: (style: HairStyle) => void;
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [styles, setStyles] = useState<HairStyle[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load from local storage or use initial data
    const saved = localStorage.getItem('hbt_styles');
    if (saved) {
      setStyles(JSON.parse(saved));
    } else {
      setStyles(INITIAL_STYLES);
    }

    const auth = localStorage.getItem('hbt_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('hbt_styles', JSON.stringify(styles));
    }
  }, [styles, isMounted]);

  const addStyle = (style: HairStyle) => {
    setStyles([...styles, style]);
  };

  const deleteStyle = (id: string) => {
    setStyles(styles.filter(s => s.id !== id));
  };

  const updateStyle = (updatedStyle: HairStyle) => {
    setStyles(styles.map(s => s.id === updatedStyle.id ? updatedStyle : s));
  };

  const login = (password: string) => {
    // Simple hardcoded password for demo purposes
    if (password === 'tofunmi123') {
      setIsAuthenticated(true);
      localStorage.setItem('hbt_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('hbt_auth');
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <DataContext.Provider value={{ styles, addStyle, deleteStyle, updateStyle, isAuthenticated, login, logout }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
