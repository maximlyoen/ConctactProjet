import { createContext, useContext, useState, ReactNode } from 'react';
import { TToken } from '../types';

interface AuthContextType {
  token: string | null; // Update the type of the token property to allow for both string and null values
  login: (jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage or other persistent storage
    return localStorage.getItem('token') || null;
  });

  const login = (jwtToken: string) => {
    setToken(jwtToken);
    // Save token to localStorage or other persistent storage
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setToken(null);
    // Remove token from localStorage or other persistent storage
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};