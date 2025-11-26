"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { HairStyle, INITIAL_STYLES, CONTACT_INFO } from '@/lib/initialData';

interface DataContextType {
  styles: HairStyle[];
  contact: typeof CONTACT_INFO;
  addStyle: (style: Omit<HairStyle, 'id'>) => void;
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
  const contact = CONTACT_INFO; // For simplicity, contact info is static in this mock

  useEffect(() => {
    setIsMounted(true);
    // Load styles from local storage or use initial data
    const savedStyles = localStorage.getItem('hbt_styles');
    if (savedStyles) {
      setStyles(JSON.parse(savedStyles));
    } else {
      setStyles(INITIAL_STYLES);
    }

    // Check auth status
    const auth = localStorage.getItem('hbt_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('hbt_styles', JSON.stringify(styles));
    }
  }, [styles, isMounted]);

  const addStyle = (style: Omit<HairStyle, 'id'>) => {
    const newStyle: HairStyle = { ...style, id: Date.now().toString() };
    setStyles([...styles, newStyle]);
  };

  const deleteStyle = (id: string) => {
    setStyles(styles.filter(s => s.id !== id));
  };

  const updateStyle = (updatedStyle: HairStyle) => {
    setStyles(styles.map(s => s.id === updatedStyle.id ? updatedStyle : s));
  };

  // Mock Authentication
  const login = (password: string) => {
    // Simple hardcoded password for demo purposes (Admin: tofunmi, Pass: Tofunmi2025!)
    if (password === 'Tofunmi2025!') {
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

  // Must check mount state to prevent hydration errors when accessing localStorage
  if (!isMounted) return <div className="min-h-screen bg-secondary"></div>; 

  return (
    <DataContext.Provider value={{ styles, contact, addStyle, deleteStyle, updateStyle, isAuthenticated, login, logout }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
