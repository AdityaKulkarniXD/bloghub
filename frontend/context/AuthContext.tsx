'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '@/lib/types';
import { authAPI } from '@/lib/api';
import { getToken, setToken, removeToken, isTokenExpired } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token && !isTokenExpired(token)) {
        try {
          const response = await authAPI.me();
          setState({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            token,
          });
        } catch (error) {
          removeToken();
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            token: null,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          token: null,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    const { token, user } = response.data;
    
    setToken(token);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      token,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authAPI.register({ name, email, password });
    const { token, user } = response.data;
    
    setToken(token);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      token,
    });
  };

  const logout = () => {
    removeToken();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  const refreshUser = async () => {
    if (state.token) {
      try {
        const response = await authAPI.me();
        setState(prev => ({
          ...prev,
          user: response.data.user,
        }));
      } catch (error) {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};