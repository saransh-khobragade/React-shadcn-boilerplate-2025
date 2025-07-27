import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  User,
  LoginCredentials,
  SignupCredentials,
  AuthContextType,
} from '@/types/auth';

const defaultAuthContext: AuthContextType = {
  user: null,
  login: () => {
    throw new Error('AuthContext not initialized');
  },
  signup: () => {
    throw new Error('AuthContext not initialized');
  },
  logout: () => {
    throw new Error('AuthContext not initialized');
  },
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser !== null) {
      try {
        const parsedUser = JSON.parse(savedUser) as User;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data - in real app, this would come from your backend
      const [emailPrefix] = credentials.email.split('@');
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: emailPrefix ?? 'User', // Fallback if split fails
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
