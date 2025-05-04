
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
  };

  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    login('demo@roomify.com', 'password123');
  };

  const handleFacebookLogin = () => {
    // In a real app, this would integrate with Facebook OAuth
    login('demo@roomify.com', 'password123');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full mx-auto mt-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-roomify-purple">Roomify</h1>
          <p className="text-gray-600 mt-2">Find your perfect roommate match</p>
        </div>
        
        <LoginForm
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onFacebookLogin={handleFacebookLogin}
        />
        
        <div className="mt-8 text-center">
          <Link 
            to="/how-it-works"
            className="text-roomify-purple hover:text-roomify-purple-dark underline"
          >
            Learn how Roomify works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
