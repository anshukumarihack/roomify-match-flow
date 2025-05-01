
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Star, Flame, Badge, House, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Add floating animation to icons
  useEffect(() => {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      const delay = index * 0.5;
      const element = icon as HTMLElement;
      element.style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-roomify-purple-light to-roomify-purple text-white py-20 px-4">
        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <House className="absolute top-[10%] left-[10%] text-white/20 w-16 h-16 floating-icon animate-float" />
          <Star className="absolute top-[15%] right-[15%] text-yellow-300/30 w-12 h-12 floating-icon animate-float" />
          <Flame className="absolute bottom-[20%] left-[20%] text-orange-400/20 w-14 h-14 floating-icon animate-float" />
          <Badge className="absolute bottom-[25%] right-[25%] text-blue-300/20 w-10 h-10 floating-icon animate-float" />
          <Sparkles className="absolute top-[40%] right-[40%] text-yellow-200/20 w-8 h-8 floating-icon animate-float" />
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Roommate Match
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Swipe, match, and connect with compatible roommates. 
            Our gamified platform helps you find the ideal person to share your space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-roomify-purple hover:bg-gray-100"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/login')}
            >
              I Already Have an Account
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-roomify-purple">
            Find Roommates That Match Your Lifestyle
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-roomify-purple/10 w-fit mb-4">
                <Star className="h-8 w-8 text-roomify-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our algorithm matches you with roommates based on lifestyle, habits, and preferences.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 w-fit mb-4">
                <Badge className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gain XP, level up, and unlock badges as you use the app and find great matches.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 w-fit mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Streaks</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your streak by logging in daily for special rewards and bonuses.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-roomify-purple">
            Ready to Find Your Perfect Roommate?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Join thousands of users who have already found their ideal living situations through Roomify.
          </p>
          <Button
            size="lg"
            className="bg-roomify-primary hover:bg-roomify-purple-dark"
            onClick={() => navigate('/signup')}
          >
            Create Your Account
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Roomify</h2>
              <p className="text-gray-400">Find your perfect roommate match</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Roomify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
