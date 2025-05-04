
import React, { useState, useEffect } from 'react';
import RoommateCard, { RoommateProfile } from './RoommateCard';
import { Button } from '@/components/ui/button';
import { X, Heart, Undo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SwipeInterfaceProps {
  profiles?: RoommateProfile[];
  onMatch: (profile: RoommateProfile) => void;
  onGainXP: (amount: number) => void;
}

const SwipeInterface: React.FC<SwipeInterfaceProps> = ({ profiles = [], onMatch, onGainXP }) => {
  const { user } = useAuth();
  const [currentProfiles, setCurrentProfiles] = useState<RoommateProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastRejectedProfile, setLastRejectedProfile] = useState<RoommateProfile | null>(null);
  const [undoAvailable, setUndoAvailable] = useState(false);
  
  useEffect(() => {
    if (profiles && profiles.length > 0) {
      setCurrentProfiles(profiles);
    }
  }, [profiles]);

  const handleLike = () => {
    if (isAnimating || currentIndex >= currentProfiles.length) return;
    
    setDirection('right');
    setIsAnimating(true);
    
    const profile = currentProfiles[currentIndex];
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
      setCurrentIndex(currentIndex + 1);
      setUndoAvailable(false);
      
      // Only trigger match for high compatibility profiles
      if (profile.compatibility > 85) {
        onMatch(profile);
        onGainXP(20);
      } else {
        onGainXP(5);
      }
    }, 300);
  };

  const handleReject = () => {
    if (isAnimating || currentIndex >= currentProfiles.length) return;
    
    const profile = currentProfiles[currentIndex];
    setLastRejectedProfile(profile);
    
    setDirection('left');
    setIsAnimating(true);
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
      setCurrentIndex(currentIndex + 1);
      setUndoAvailable(true);
      onGainXP(2);
    }, 300);
  };

  const handleUndo = () => {
    if (isAnimating || !undoAvailable || currentIndex === 0) return;
    
    setCurrentIndex(currentIndex - 1);
    setUndoAvailable(false);
  };

  const currentProfile = currentProfiles[currentIndex];
  const isOutOfProfiles = currentIndex >= currentProfiles.length;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full max-w-md relative min-h-[60vh] mb-8">
        {isOutOfProfiles ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">No more profiles</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You've seen all available profiles for now. Check back later for new matches!
            </p>
            <Button 
              className="bg-roomify-purple hover:bg-roomify-purple-dark" 
              onClick={() => setCurrentIndex(0)}
            >
              Start Over
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "transition-all duration-300 absolute w-full",
              direction === 'left' && "translate-x-[-120%] rotate-[-20deg]",
              direction === 'right' && "translate-x-[120%] rotate-[20deg]",
            )}
          >
            <RoommateCard
              profile={currentProfile}
              onLike={handleLike}
              onReject={handleReject}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-center space-x-6 pb-16">
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          onClick={handleReject}
          disabled={isAnimating || isOutOfProfiles}
        >
          <X className="h-8 w-8 text-white" />
        </Button>
        
        <Button
          className={cn(
            "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg",
            !undoAvailable && "opacity-50"
          )}
          onClick={handleUndo}
          disabled={!undoAvailable || isAnimating}
        >
          <Undo className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </Button>
        
        <Button
          className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          onClick={handleLike}
          disabled={isAnimating || isOutOfProfiles}
        >
          <Heart className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeInterface;
