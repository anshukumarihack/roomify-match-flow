
import React, { useState } from 'react';
import SwipeInterface from '@/components/swipe/SwipeInterface';
import { RoommateProfile } from '@/components/swipe/RoommateCard';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import MatchNotification from '@/components/notifications/MatchNotification';
import { useNavigate } from 'react-router-dom';

const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<RoommateProfile | null>(null);
  
  const handleMatch = async (profile: RoommateProfile) => {
    // Record the match in history
    console.log('Match with:', profile);
    
    // Show the match notification
    setMatchedProfile(profile);
    setShowMatchNotification(true);
    
    // In a real app with authentication, you'd record this in Supabase
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .insert([
          {
            user_id: '00000000-0000-0000-0000-000000000000', // This would be the actual user ID
            activity_type: 'match',
            details: { matched_with: profile.id, name: profile.name }
          }
        ]);
        
      if (error) {
        console.error('Error recording match:', error);
      }
    } catch (error) {
      console.error('Error recording match activity:', error);
    }
  };

  const handleGainXP = (amount: number) => {
    // In a real app, this would call an API to update user XP
    console.log('XP gained:', amount);
  };
  
  const handleMessageMatch = () => {
    if (matchedProfile) {
      navigate(`/messages/${matchedProfile.id}`);
    }
    setShowMatchNotification(false);
  };
  
  const handleCloseNotification = () => {
    setShowMatchNotification(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20">
      <h1 className="text-2xl font-bold mb-4 text-roomify-purple text-center">Find Your Match</h1>
      <SwipeInterface onMatch={handleMatch} onGainXP={handleGainXP} />
      
      {showMatchNotification && matchedProfile && (
        <MatchNotification
          matchName={matchedProfile.name}
          matchAvatar={matchedProfile.avatarUrl}
          onClose={handleCloseNotification}
          onMessage={handleMessageMatch}
        />
      )}
    </div>
  );
};

export default SwipePage;
