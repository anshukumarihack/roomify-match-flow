
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { toast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would call an API
    console.log('Login:', { email, password });
    
    toast({
      title: "Login successful",
      description: "Welcome back to Roomify!"
    });
    
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    console.log('Google login');
    
    toast({
      title: "Login successful",
      description: "Welcome back to Roomify!"
    });
    
    navigate('/dashboard');
  };

  const handleFacebookLogin = () => {
    // In a real app, this would integrate with Facebook OAuth
    console.log('Facebook login');
    
    toast({
      title: "Login successful",
      description: "Welcome back to Roomify!"
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-roomify-purple">Roomify</h1>
          <p className="text-gray-600 mt-2">Find your perfect roommate match</p>
        </div>
        
        <LoginForm
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onFacebookLogin={handleFacebookLogin}
        />
      </div>
    </div>
  );
};

export default Login;
