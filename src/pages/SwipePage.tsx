
import React from 'react';
import SwipeInterface from '@/components/swipe/SwipeInterface';
import { RoommateProfile } from '@/components/swipe/RoommateCard';
import { toast } from '@/components/ui/use-toast';

const SwipePage: React.FC = () => {
  const handleMatch = (profile: RoommateProfile) => {
    // In a real app, this would call an API to record the match
    console.log('Match with:', profile);
  };

  const handleGainXP = (amount: number) => {
    // In a real app, this would call an API to update user XP
    console.log('XP gained:', amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20">
      <h1 className="text-2xl font-bold mb-4 text-roomify-purple text-center">Find Your Match</h1>
      <SwipeInterface onMatch={handleMatch} onGainXP={handleGainXP} />
    </div>
  );
};

export default SwipePage;
