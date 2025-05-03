
import React, { useState, useEffect } from 'react';
import RoommateCard, { RoommateProfile } from './RoommateCard';
import { Button } from '@/components/ui/button';
import { X, Heart, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Generate mock data for roommate profiles with realistic avatars
const generateMockProfiles = (count: number): RoommateProfile[] => {
  const names = [
    'Emma Wilson', 'James Rodriguez', 'Sarah Chen', 'Michael Taylor', 'Olivia Brown',
    'Noah Martinez', 'Sophia Johnson', 'Ethan Williams', 'Ava Jones', 'Liam Garcia',
    'Isabella Miller', 'Mason Davis', 'Mia Hernandez', 'Jacob Smith', 'Charlotte Wilson',
    'William Anderson', 'Amelia Thomas', 'Benjamin Moore', 'Abigail Jackson', 'Lucas White',
    'Emily Harris', 'Alexander Martin', 'Elizabeth Thompson', 'Daniel Garcia', 'Sofia Robinson'
  ];
  
  const occupations = [
    'Software Developer', 'Marketing Manager', 'Teacher', 'Nurse', 
    'Graphic Designer', 'UX Designer', 'Data Analyst', 'Financial Advisor',
    'Student', 'Freelancer', 'Entrepreneur', 'Sales Representative',
    'Doctor', 'Engineer', 'Lawyer', 'Consultant', 'Artist',
    'Writer', 'Chef', 'Photographer', 'Musician', 'Architect',
    'Psychologist', 'HR Manager', 'Project Manager'
  ];
  
  const bios = [
    'Looking for a clean, responsible roommate. I work 9-5 and enjoy reading and hiking on weekends.',
    'Tech enthusiast working from home. Pretty laid-back, but prefer a tidy space. Love cooking and video games.',
    'PhD student in Biology. I need quiet study time but also enjoy socializing. Looking for someone respectful of space.',
    'Work night shifts at the hospital. Very clean and organized. I\'m rarely home and make for an easy roommate.',
    'Creative type working from home. I keep common spaces clean but my room can get messy with projects. Love cooking and art.',
    'Remote worker in tech. I\'m quiet, clean, and respectful. Looking for similar roommates who value peace and quiet.',
    'Grad student looking for responsible roommates. I\'m studious during the week but social on weekends.',
    'Young professional working in finance. Clean, organized, and prefer a drama-free living environment.',
    'Fitness enthusiast who loves cooking healthy meals. Early riser and looking for positive, active roommates.',
    'Musician who practices during reasonable hours. I\'m easygoing and sociable, but respect personal space.',
    'Medical resident with irregular hours. Quiet, clean, and mostly just need a place to sleep between shifts.',
    'Digital nomad who travels often. Looking for a flexible living situation with understanding roommates.',
    'Law student who studies a lot. I\'m organized, quiet, and make a great roommate for other professionals.',
    'Artist who needs some space for creative work. I\'m friendly, respectful, and clean in common areas.',
    'Recent grad starting my first job. Looking for roommates in a similar life stage to share experiences with.'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `profile-${i + 1}`,
    name: names[i % names.length],
    age: Math.floor(Math.random() * 10) + 22, // 22-32 years old
    occupation: occupations[i % occupations.length],
    bio: bios[i % bios.length],
    distance: Math.floor(Math.random() * 15) + 1, // 1-15 miles
    compatibility: Math.floor(Math.random() * 30) + 70, // 70-100% compatibility
    sleepSchedule: ['early-bird', 'night-owl', 'mixed'][Math.floor(Math.random() * 3)],
    cleanliness: Math.floor(Math.random() * 5) + 1, // 1-5 rating
    smoking: ['non-smoker', 'outside-only', 'smoker'][Math.floor(Math.random() * 3)],
    pets: ['has-pets', 'no-pets', 'planning-pets'][Math.floor(Math.random() * 3)],
    dietaryPreferences: [['omnivore', 'vegetarian', 'vegan', 'keto', 'paleo'][Math.floor(Math.random() * 5)]],
    photoUrls: [],
    xpValue: 10,
    avatarUrl: `https://i.pravatar.cc/400?u=${i + 1}${Date.now()}` // Using pravatar for random realistic avatars
  }));
};

interface SwipeInterfaceProps {
  onMatch: (profile: RoommateProfile) => void;
  onGainXP: (amount: number) => void;
}

const SwipeInterface: React.FC<SwipeInterfaceProps> = ({ onMatch, onGainXP }) => {
  // Generate 25 mock profiles
  const [profiles, setProfiles] = useState<RoommateProfile[]>(generateMockProfiles(25));
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

  // Refresh profiles function
  const refreshProfiles = () => {
    setIsLoading(true);
    // Generate new batch of 25 profiles
    const newProfiles = generateMockProfiles(25);
    setProfiles(newProfiles);
    
    setTimeout(() => {
      setCurrentProfile(newProfiles[0]);
      setIsLoading(false);
      
      toast({
        title: "Profiles Refreshed",
        description: "Found 25 new potential roommates for you!",
        duration: 2000
      });
    }, 1000);
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
            onClick={refreshProfiles} 
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
