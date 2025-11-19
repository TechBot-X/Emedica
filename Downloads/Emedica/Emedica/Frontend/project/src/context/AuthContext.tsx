import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Kavita Joshi',
    email: 'doctor@hospital.com',
    role: 'doctor',
    specialization: 'Cardiology',
    department: 'Internal Medicine',
    phone: '+1 (555) 123-4567',
    licenseNumber: 'MD123456'
  },
  {
    id: '2',
    name: 'Suresh Nair',
    email: 'patient@email.com',
    role: 'patient',
    phone: '+1 (555) 987-6543',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1985-06-15',
    emergencyContact: 'Jane Smith - (555) 111-2222'
  },
  {
    id: '3',
    name: 'Manoj Gupta',
    email: 'admin@hospital.com',
    role: 'admin',
    department: 'Administration',
    phone: '+1 (555) 456-7890'
  },
  {
    id: '4',
    name: 'Pooja Desai',
    email: 'superadmin@hospital.com',
    role: 'superadmin',
    phone: '+1 (555) 321-9876'
  },
  {
    id: '5',
    name: 'Dr. Asha Menon',
    email: 'trainee@hospital.com',
    role: 'trainee',
    specialization: 'Internal Medicine',
    department: 'Internal Medicine',
    supervisorId: '1',
    phone: '+1 (555) 654-3210'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
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