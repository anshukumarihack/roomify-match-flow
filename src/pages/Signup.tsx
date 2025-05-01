
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { toast } from '@/components/ui/use-toast';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = (name: string, email: string, password: string) => {
    // In a real app, this would call an API
    console.log('Signup:', { name, email, password });
    
    toast({
      title: "Account created!",
      description: "Let's set up your profile"
    });
    
    navigate('/create-profile');
  };

  const handleGoogleSignup = () => {
    // In a real app, this would integrate with Google OAuth
    console.log('Google signup');
    
    toast({
      title: "Account created!",
      description: "Let's set up your profile"
    });
    
    navigate('/create-profile');
  };

  const handleFacebookSignup = () => {
    // In a real app, this would integrate with Facebook OAuth
    console.log('Facebook signup');
    
    toast({
      title: "Account created!",
      description: "Let's set up your profile"
    });
    
    navigate('/create-profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-roomify-purple">Roomify</h1>
          <p className="text-gray-600 mt-2">Find your perfect roommate match</p>
        </div>
        
        <SignupForm
          onSignup={handleSignup}
          onGoogleSignup={handleGoogleSignup}
          onFacebookSignup={handleFacebookSignup}
        />
      </div>
    </div>
  );
};

export default Signup;
