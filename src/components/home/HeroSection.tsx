
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { House, Star, Flame, Badge as BadgeIcon, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-br from-roomify-purple-light to-roomify-purple text-white py-20 px-4">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <House className="absolute top-[10%] left-[10%] text-white/20 w-16 h-16 floating-icon animate-float" />
        <Star className="absolute top-[15%] right-[15%] text-yellow-300/30 w-12 h-12 floating-icon animate-float" />
        <Flame className="absolute bottom-[20%] left-[20%] text-orange-400/20 w-14 h-14 floating-icon animate-float" />
        <BadgeIcon className="absolute bottom-[25%] right-[25%] text-blue-300/20 w-10 h-10 floating-icon animate-float" />
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
  );
};

export default HeroSection;
