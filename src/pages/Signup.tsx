
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/context/AuthContext';

const Signup: React.FC = () => {
  const { signUp } = useAuth();

  const handleSignup = (name: string, email: string, password: string) => {
    signUp(name, email, password);
  };

  const handleGoogleSignup = () => {
    // In a real app, this would integrate with Google OAuth
    signUp('Demo User', 'demo@roomify.com', 'password123');
  };

  const handleFacebookSignup = () => {
    // In a real app, this would integrate with Facebook OAuth
    signUp('Demo User', 'demo@roomify.com', 'password123');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full mx-auto mt-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-roomify-purple">Roomify</h1>
          <p className="text-gray-600 mt-2">Find your perfect roommate match</p>
        </div>
        
        <SignupForm
          onSignup={handleSignup}
          onGoogleSignup={handleGoogleSignup}
          onFacebookSignup={handleFacebookSignup}
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

export default Signup;
