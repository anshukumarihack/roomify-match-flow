import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  preferences?: Record<string, any>;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (profileData: any) => void;
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
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      
      const isPublicRoute = ['/', '/login', '/signup', '/about', '/how-it-works', '/create-profile'].includes(location.pathname);
      
      // If user has not completed profile setup and not on profile creation page
      if (parsedUser && !parsedUser.profileCompleted && location.pathname !== '/create-profile') {
        navigate('/create-profile');
      } 
      // Don't redirect if already on a protected route or if profile is completed
      else if (isPublicRoute && parsedUser.profileCompleted && location.pathname !== '/') {
        navigate('/dashboard');
      }
    } else if (!['/login', '/signup', '/about', '/how-it-works', '/'].includes(location.pathname)) {
      // Redirect to login if no user and trying to access protected route
      navigate('/login');
    }
  }, [navigate, location.pathname]);
  
  const login = (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    console.log('Login:', { email, password });
    
    // Try to find existing user in localStorage
    const savedUser = localStorage.getItem('roomify_user');
    if (savedUser) {
      const existingUser = JSON.parse(savedUser);
      if (existingUser.email === email) {
        setUser(existingUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Login successful",
          description: "Welcome back to Roomify!"
        });
        
        if (!existingUser.profileCompleted) {
          navigate('/create-profile');
        } else {
          navigate('/dashboard');
        }
        return;
      }
    }
    
    // If not found, create a mock user with a consistent avatar based on email
    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: email.split('@')[0],
      email: email,
      avatarUrl: generateAvatarUrl(userId),
      profileCompleted: false
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('roomify_user', JSON.stringify(newUser));
    
    toast({
      title: "Login successful",
      description: "Welcome to Roomify!"
    });
    
    // Send new users to create their profile
    navigate('/create-profile');
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
      profileCompleted: false
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('roomify_user', JSON.stringify(newUser));
    
    toast({
      title: "Account created!",
      description: "Let's set up your profile preferences"
    });
    
    // Direct them to profile creation page first
    navigate('/create-profile');
  };
  
  const updateUserProfile = (profileData: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...profileData
        },
        profileCompleted: true
      };
      
      setUser(updatedUser);
      localStorage.setItem('roomify_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your preferences have been saved"
      });
      
      // After profile completion, redirect to dashboard
      navigate('/dashboard');
    }
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
      isAuthenticated,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
