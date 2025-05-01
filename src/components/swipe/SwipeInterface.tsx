
import React, { useState, useEffect } from 'react';
import RoommateCard, { RoommateProfile } from './RoommateCard';
import { Button } from '@/components/ui/button';
import { X, Heart, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data for roommate profiles
const mockProfiles: RoommateProfile[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 25,
    occupation: 'Marketing Manager',
    bio: 'Looking for a clean, responsible roommate. I work 9-5 and enjoy reading and hiking on weekends.',
    distance: 3,
    compatibility: 95,
    sleepSchedule: 'early-bird',
    cleanliness: 4,
    smoking: 'non-smoker',
    pets: 'no-pets',
    dietaryPreferences: ['vegetarian'],
    photoUrls: ['', '', ''], // Empty strings will use placeholder images
    xpValue: 10
  },
  {
    id: '2',
    name: 'James Rodriguez',
    age: 28,
    occupation: 'Software Developer',
    bio: 'Tech enthusiast working from home. Pretty laid-back, but prefer a tidy space. Love cooking and video games.',
    distance: 5,
    compatibility: 85,
    sleepSchedule: 'night-owl',
    cleanliness: 3,
    smoking: 'outside-only',
    pets: 'has-pets',
    dietaryPreferences: ['omnivore'],
    photoUrls: ['', ''],
    xpValue: 10
  },
  {
    id: '3',
    name: 'Sarah Chen',
    age: 24,
    occupation: 'Grad Student',
    bio: 'PhD student in Biology. I need quiet study time but also enjoy socializing. Looking for someone respectful of space.',
    distance: 2,
    compatibility: 78,
    sleepSchedule: 'mixed',
    cleanliness: 5,
    smoking: 'non-smoker',
    pets: 'no-pets',
    dietaryPreferences: ['vegan'],
    photoUrls: ['', '', '', ''],
    xpValue: 10
  },
  {
    id: '4',
    name: 'Michael Taylor',
    age: 30,
    occupation: 'Nurse',
    bio: "Work night shifts at the hospital. Very clean and organized. I'm rarely home and make for an easy roommate.",
    distance: 7,
    compatibility: 65,
    sleepSchedule: 'night-owl',
    cleanliness: 4,
    smoking: 'non-smoker',
    pets: 'planning-pets',
    dietaryPreferences: ['keto'],
    photoUrls: ['', ''],
    xpValue: 10
  },
  {
    id: '5',
    name: 'Jessica Patel',
    age: 27,
    occupation: 'Graphic Designer',
    bio: 'Creative type working from home. I keep common spaces clean but my room can get messy with projects. Love cooking and art.',
    distance: 4,
    compatibility: 88,
    sleepSchedule: 'mixed',
    cleanliness: 3,
    smoking: 'non-smoker',
    pets: 'has-pets',
    dietaryPreferences: ['vegetarian'],
    photoUrls: ['', '', ''],
    xpValue: 10
  }
];

interface SwipeInterfaceProps {
  onMatch: (profile: RoommateProfile) => void;
  onGainXP: (amount: number) => void;
}

const SwipeInterface: React.FC<SwipeInterfaceProps> = ({ onMatch, onGainXP }) => {
  const [profiles, setProfiles] = useState<RoommateProfile[]>(mockProfiles);
  const [currentProfile, setCurrentProfile] = useState<RoommateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuperSwipe, setIsSuperSwipe] = useState(false);
  
  // Premium feature simulation
  const [superSwipesAvailable, setSuperSwipesAvailable] = useState(1);

  useEffect(() => {
    if (profiles.length > 0 && !currentProfile) {
      setCurrentProfile(profiles[0]);
    }
  }, [profiles, currentProfile]);

  const handleSwipe = (direction: 'left' | 'right', profile: RoommateProfile) => {
    // Track that user swiped and award XP
    onGainXP(profile.xpValue);
    
    // Toast notification for XP gain
    toast({
      title: `+${profile.xpValue} XP`,
      description: "Keep swiping to gain more experience!",
      duration: 2000
    });
    
    // Check if it's a match
    if (direction === 'right' && Math.random() > 0.3) { // 70% chance of match if user swipes right
      // It's a match!
      onMatch(profile);
      
      // Additional XP for making a match
      onGainXP(50);
      
      toast({
        title: "It's a Match! 🎉",
        description: `You and ${profile.name} have matched!`,
        duration: 3000
      });
    }
    
    // Clear current profile and load the next one
    loadNextProfile();
  };

  const loadNextProfile = () => {
    setIsLoading(true);
    setCurrentProfile(null);
    setIsSuperSwipe(false);
    
    // Remove the first profile from the list
    const updatedProfiles = [...profiles];
    updatedProfiles.shift();
    setProfiles(updatedProfiles);
    
    // Simulate network delay for loading the next profile
    setTimeout(() => {
      if (updatedProfiles.length > 0) {
        setCurrentProfile(updatedProfiles[0]);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSuperSwipe = () => {
    if (superSwipesAvailable > 0 && currentProfile) {
      setSuperSwipesAvailable(prev => prev - 1);
      setIsSuperSwipe(true);
      
      // Guaranteed match with Super Swipe
      setTimeout(() => {
        onMatch(currentProfile);
        onGainXP(100); // Extra XP for super swipe
        
        toast({
          title: "Super Match! ⭐",
          description: `You and ${currentProfile.name} have created a super match!`,
          duration: 3000
        });
        
        loadNextProfile();
      }, 2000); // Allow time for the animation to play
    } else {
      toast({
        title: "No Super Swipes Left",
        description: "Upgrade to Premium for more Super Swipes!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 relative">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-roomify-purple-light border-t-roomify-purple rounded-full animate-spin"></div>
          <p className="mt-4 text-roomify-purple">Finding perfect matches for you...</p>
        </div>
      ) : currentProfile ? (
        <>
          <RoommateCard 
            profile={currentProfile} 
            onSwipe={handleSwipe} 
            isSuperSwipe={isSuperSwipe}
          />
          
          <div className="flex justify-center mt-6 gap-4">
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full p-6 bg-white text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => handleSwipe('left', currentProfile)}
            >
              <X className="h-8 w-8" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full p-6 bg-white text-yellow-500 border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
              onClick={handleSuperSwipe}
            >
              <Sparkles className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {superSwipesAvailable}
              </span>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full p-6 bg-white text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600"
              onClick={() => handleSwipe('right', currentProfile)}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <h2 className="text-2xl font-semibold text-roomify-purple mb-2">No More Profiles</h2>
          <p className="text-gray-600 mb-6">Check back later for more potential roommates!</p>
          <Button 
            onClick={() => setProfiles(mockProfiles)} 
            className="bg-roomify-primary hover:bg-roomify-purple-dark"
          >
            Refresh Profiles
          </Button>
        </div>
      )}
    </div>
  );
};

export default SwipeInterface;
