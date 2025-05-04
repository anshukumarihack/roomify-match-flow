
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  preferences?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to generate a consistent avatar URL based on user ID
const generateAvatarUrl = (userId: string) => {
  // Using Pravatar for consistent human-like avatars
  return `https://i.pravatar.cc/300?img=${Math.floor(Math.abs(
    userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % 70)}`;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for existing user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('roomify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      
      // Don't redirect if already on a protected route
      const isPublicRoute = ['/login', '/signup', '/about', '/how-it-works'].includes(location.pathname);
      if (isPublicRoute) {
        navigate('/dashboard');
      }
    } else if (!['/login', '/signup', '/about', '/how-it-works'].includes(location.pathname)) {
      // Redirect to login if no user and trying to access protected route
      navigate('/login');
    }
  }, [navigate, location.pathname]);
  
  const login = (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    console.log('Login:', { email, password });
    
    // Create a mock user with a consistent avatar based on email
    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: email.split('@')[0],
      email: email,
      avatarUrl: generateAvatarUrl(userId),
      preferences: { completedOnboarding: true }
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('roomify_user', JSON.stringify(newUser));
    
    toast({
      title: "Login successful",
      description: "Welcome to Roomify!"
    });
    
    navigate('/dashboard');
  };
  
  const signUp = (name: string, email: string, password: string) => {
    // In a real app, this would create a user with an API
    console.log('Signup:', { name, email, password });
    
    // Create a new user with a consistent avatar
    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: name,
      email: email,
      avatarUrl: generateAvatarUrl(userId),
      preferences: { completedOnboarding: true }
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('roomify_user', JSON.stringify(newUser));
    
    toast({
      title: "Account created!",
      description: "Welcome to Roomify!"
    });
    
    navigate('/dashboard');
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('roomify_user');
    
    toast({
      title: "Logged out",
      description: "You've been successfully logged out"
    });
    
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signUp, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
