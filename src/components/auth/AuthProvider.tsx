import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '../../types';
import { useAppStore, mockAsSystemAdmin, mockAsHostAdmin, mockAsTrader } from '../../store/store';

interface AuthContextType {
  user: User | null;
  login: (userRole: 'SYSTEM_ADMIN' | 'HOST_ADMIN' | 'TRADER') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAppStore();

  const login = (userRole: 'SYSTEM_ADMIN' | 'HOST_ADMIN' | 'TRADER') => {
    switch (userRole) {
      case 'SYSTEM_ADMIN':
        mockAsSystemAdmin();
        break;
      case 'HOST_ADMIN':
        mockAsHostAdmin();
        break;
      case 'TRADER':
        mockAsTrader();
        break;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};