
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Facebook, LogIn, Mail, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onGoogleLogin, 
  onFacebookLogin 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-roomify-purple-light shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-gradient-to-r from-roomify-purple to-blue-500">Welcome Back!</CardTitle>
        <CardDescription className="text-center text-lg">
          Login to find your perfect roommate match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-roomify-purple" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-roomify-gray focus:ring-2 focus:ring-roomify-purple transition-all duration-200 h-11 text-base"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-roomify-purple" />
                Password
              </Label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-roomify-blue underline hover:text-roomify-blue-dark transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-roomify-gray focus:ring-2 focus:ring-roomify-purple transition-all duration-200 h-11 text-base"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-roomify-purple to-blue-500 hover:from-roomify-purple-dark hover:to-blue-600 transition-all duration-300 h-12 text-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </div>
            )}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-roomify-gray-dark"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-roomify-gray-dark">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-roomify-gray-dark hover:bg-roomify-gray-light transition-colors h-11"
            onClick={onGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-roomify-gray-dark hover:bg-roomify-gray-light transition-colors h-11"
            onClick={onFacebookLogin}
          >
            <Facebook className="w-5 h-5 mr-2 text-blue-600" />
            Facebook
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-6">
        <p className="text-base text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-roomify-purple hover:text-roomify-purple-dark underline font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
