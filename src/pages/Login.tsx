
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    // AuthContext will handle the redirection based on profile completion status
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-roomify-purple/5 dark:from-gray-900 dark:to-roomify-purple/20 p-4">
      <div className="container mx-auto px-4 pt-4 pb-8">
        <Link to="/about">
          <Button 
            variant="ghost" 
            className="p-2 mb-6 rounded-full hover:bg-roomify-purple/10"
            aria-label="Back to About"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2">Back to About</span>
          </Button>
        </Link>
      </div>
      
      <motion.div 
        className="max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-roomify-purple to-blue-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Roomify
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mt-2 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find your perfect roommate match
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <LoginForm
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
          />
        </motion.div>
        
        <div className="mt-8 flex flex-col items-center space-y-4">
          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link 
              to="/signup"
              className="text-roomify-purple hover:text-roomify-purple-dark font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
          
          <Link 
            to="/how-it-works"
            className="text-roomify-purple hover:text-roomify-purple-dark underline transition-colors duration-200"
          >
            Learn how Roomify works
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
