"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { HairStyle, INITIAL_STYLES, CONTACT_INFO } from '@/lib/constants';

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
  const contact = CONTACT_INFO;

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
    const newStyle: HairStyle = { 
        ...style, 
        id: Date.now().toString(), 
        price: Number(style.price) // Ensure price is number
    };
    setStyles([...styles, newStyle]);
  };

  const deleteStyle = (id: string) => {
    setStyles(styles.filter(s => s.id !== id));
  };

  const updateStyle = (updatedStyle: HairStyle) => {
    setStyles(styles.map(s => s.id === updatedStyle.id ? updatedStyle : s));
  };

  // Mock Authentication (Admin: tofunmi, Pass: Tofunmi2025!)
  const login = (password: string) => {
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

  // Prevent hydration errors
  if (!isMounted) return <div className="min-h-screen bg-secondary"></div>; 

  const contextValue = useMemo(() => ({
    styles, contact, addStyle, deleteStyle, updateStyle, isAuthenticated, login, logout
  }), [styles, contact, isAuthenticated]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
