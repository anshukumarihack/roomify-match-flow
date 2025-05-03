
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchNotificationProps {
  matchName: string;
  matchAvatar?: string;
  onClose: () => void;
  onMessage: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({
  matchName,
  matchAvatar,
  onClose,
  onMessage
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const userAvatar = `https://i.pravatar.cc/150?u=user-${Date.now()}`;

  useEffect(() => {
    // Animation timing
    setTimeout(() => setIsVisible(true), 100);
    
    // Show confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9B87F5', '#FFC0CB']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9B87F5', '#FFC0CB']
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    try {
      runConfetti();
    } catch (error) {
      console.error('Confetti error:', error);
    }
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-2xl max-w-md mx-auto transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-12'}`}>
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0" 
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative mx-2">
              <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
              <Avatar className="h-20 w-20 border-2 border-white dark:border-gray-800">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-roomify-purple">You</AvatarFallback>
              </Avatar>
            </div>
            <div className="mx-4 flex items-center">
              <Heart className="text-pink-500 animate-pulse h-10 w-10" />
            </div>
            <div className="relative mx-2">
              <div className="absolute inset-0 bg-roomify-purple rounded-full animate-ping opacity-30"></div>
              <Avatar className="h-20 w-20 border-2 border-white dark:border-gray-800">
                <AvatarImage src={matchAvatar} />
                <AvatarFallback className="bg-roomify-purple-light">{matchName.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-1 text-roomify-purple">It's a Match!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You and <span className="font-semibold">{matchName}</span> have matched!
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button 
              className="bg-roomify-primary hover:bg-roomify-purple-dark transition-colors"
              onClick={onMessage}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Send Message
            </Button>
            <Button 
              variant="outline"
              className="border-roomify-purple text-roomify-purple hover:bg-roomify-purple hover:text-white transition-colors"
              onClick={onClose}
            >
              Keep Swiping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchNotification;
