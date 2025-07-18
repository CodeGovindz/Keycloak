"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  isPro: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  upgradeToPro: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('todo_user');
      const storedIsPro = localStorage.getItem('todo_isPro');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedIsPro) {
        setIsPro(JSON.parse(storedIsPro));
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      localStorage.removeItem('todo_user');
      localStorage.removeItem('todo_isPro');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('todo_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsPro(false);
    localStorage.removeItem('todo_user');
    localStorage.removeItem('todo_isPro');
    localStorage.removeItem('todos'); // Also clear todos on logout
  };

  const upgradeToPro = () => {
    setIsPro(true);
    localStorage.setItem('todo_isPro', JSON.stringify(true));
  };

  const value = { user, isPro, loading, login, logout, upgradeToPro };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
