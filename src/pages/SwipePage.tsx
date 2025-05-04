
import React, { useState, useEffect } from 'react';
import SwipeInterface from '@/components/swipe/SwipeInterface';
import { RoommateProfile } from '@/components/swipe/RoommateCard';
import { toast } from '@/components/ui/use-toast';
import MatchNotification from '@/components/notifications/MatchNotification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<RoommateProfile | null>(null);
  const [mockProfiles, setMockProfiles] = useState<RoommateProfile[]>([]);
  
  useEffect(() => {
    // Generate 25 mock profiles
    const personalities = ['Introvert', 'Extrovert', 'Ambivert'];
    const sleepTimes = ['Early bird', 'Night owl', 'Flexible'];
    const cleanlinessLevels = ['Very neat', 'Average', 'Relaxed'];
    const workSchedules = ['Standard 9-5', 'Flexible', 'Night shift', 'Work from home'];
    const foodPreferences = ['No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free'];
    const interestsList = [
      'Gaming', 'Movies', 'Hiking', 'Reading', 'Cooking', 'Music', 'Art', 
      'Sports', 'Traveling', 'Photography', 'Dancing', 'Yoga', 'Technology'
    ];
    
    const profiles: RoommateProfile[] = Array.from({ length: 25 }, (_, i) => {
      const id = `profile-${i + 1}`;
      const randomInterests = Array.from(
        { length: Math.floor(Math.random() * 4) + 1 }, 
        () => interestsList[Math.floor(Math.random() * interestsList.length)]
      );
      
      return {
        id,
        name: `User ${i + 1}`,
        age: Math.floor(Math.random() * 15) + 20, // 20-35
        occupation: ['Student', 'Professional', 'Freelancer'][Math.floor(Math.random() * 3)],
        bio: `Hi, I'm User ${i + 1}. I'm looking for a compatible roommate in the area!`,
        compatibility: Math.floor(Math.random() * 30) + 70, // 70-100%
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        sleepSchedule: sleepTimes[Math.floor(Math.random() * sleepTimes.length)],
        cleanliness: cleanlinessLevels[Math.floor(Math.random() * cleanlinessLevels.length)],
        workSchedule: workSchedules[Math.floor(Math.random() * workSchedules.length)],
        dietPreference: foodPreferences[Math.floor(Math.random() * foodPreferences.length)],
        interests: randomInterests.filter((v, i, a) => a.indexOf(v) === i).join(', '), // Remove duplicates
        avatarUrl: `https://i.pravatar.cc/300?u=${id}`,
        location: 'New York, NY'
      };
    });
    
    setMockProfiles(profiles);
  }, [user]);
  
  const handleMatch = async (profile: RoommateProfile) => {
    console.log('Match with:', profile);
    
    // Show the match notification
    setMatchedProfile(profile);
    setShowMatchNotification(true);
    
    toast({
      title: "It's a match!",
      description: `You matched with ${profile.name}!`
    });
  };

  const handleGainXP = (amount: number) => {
    console.log('XP gained:', amount);
    
    toast({
      title: `+${amount} XP`,
      description: "Keep swiping to earn more XP!"
    });
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
      <SwipeInterface profiles={mockProfiles} onMatch={handleMatch} onGainXP={handleGainXP} />
      
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
