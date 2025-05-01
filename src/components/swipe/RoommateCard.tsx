
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  distance: number;
  compatibility: number;
  sleepSchedule: string;
  cleanliness: number;
  smoking: string;
  pets: string;
  dietaryPreferences: string[];
  photoUrls: string[];
  xpValue: number;
  avatarUrl?: string; // Added avatarUrl property
}

interface RoommateCardProps {
  profile: RoommateProfile;
  onSwipe: (direction: 'left' | 'right', profile: RoommateProfile) => void;
  isSuperSwipe?: boolean;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ 
  profile, 
  onSwipe,
  isSuperSwipe = false
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [startX, setStartX] = React.useState(0);
  const [offsetX, setOffsetX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const nextPhoto = () => {
    if (currentPhotoIndex < profile.photoUrls.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const newOffsetX = clientX - startX;
    setOffsetX(newOffsetX);
    
    if (cardRef.current) {
      const rotation = newOffsetX * 0.1; // Adjust for desired rotation amount
      cardRef.current.style.transform = `translateX(${newOffsetX}px) rotate(${rotation}deg)`;
      
      // Adjust opacity based on swipe direction
      if (newOffsetX > 0) {
        cardRef.current.querySelector('.like-overlay')?.classList.add('opacity-100');
        cardRef.current.querySelector('.pass-overlay')?.classList.remove('opacity-100');
      } else if (newOffsetX < 0) {
        cardRef.current.querySelector('.pass-overlay')?.classList.add('opacity-100');
        cardRef.current.querySelector('.like-overlay')?.classList.remove('opacity-100');
      } else {
        cardRef.current.querySelector('.like-overlay')?.classList.remove('opacity-100');
        cardRef.current.querySelector('.pass-overlay')?.classList.remove('opacity-100');
      }
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine swipe direction based on offset magnitude
    if (Math.abs(offsetX) > 100) {
      const direction = offsetX > 0 ? 'right' : 'left';
      
      // Add the appropriate swipe animation class
      if (cardRef.current) {
        cardRef.current.classList.add(direction === 'right' ? 'card-swipe-right' : 'card-swipe-left');
      }
      
      // Call the onSwipe callback after the animation has time to play
      setTimeout(() => {
        onSwipe(direction, profile);
      }, 300);
    } else {
      // Reset card position if swipe wasn't strong enough
      if (cardRef.current) {
        cardRef.current.style.transform = '';
        cardRef.current.querySelector('.like-overlay')?.classList.remove('opacity-100');
        cardRef.current.querySelector('.pass-overlay')?.classList.remove('opacity-100');
      }
      setOffsetX(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Use the avatarUrl if available, otherwise generate a placeholder image
  const photoUrl = profile.avatarUrl || profile.photoUrls[currentPhotoIndex] || getPlaceholderImage(currentPhotoIndex);

  // Generate a placeholder image URL for demo purposes
  function getPlaceholderImage(index: number) {
    return `https://source.unsplash.com/random/400x600?person&sig=${profile.id}-${index}`;
  }

  const renderCompatibilityBadge = () => {
    let color = "bg-red-500";
    
    if (profile.compatibility >= 90) {
      color = "bg-green-500";
    } else if (profile.compatibility >= 70) {
      color = "bg-yellow-500";
    } else if (profile.compatibility >= 50) {
      color = "bg-orange-500";
    }
    
    return (
      <div className={`absolute top-4 right-4 ${color} text-white rounded-full px-3 py-1 font-semibold text-sm`}>
        {profile.compatibility}% Match
      </div>
    );
  };

  // Lifestyle tags
  const lifestyleTags = [
    profile.sleepSchedule === 'early-bird' ? 'Early Bird' : 
      profile.sleepSchedule === 'night-owl' ? 'Night Owl' : 'Mixed Schedule',
    profile.cleanliness >= 4 ? 'Neat' : 
      profile.cleanliness <= 2 ? 'Relaxed' : 'Average Cleanliness',
    profile.smoking === 'non-smoker' ? 'Non-Smoker' : 
      profile.smoking === 'outside-only' ? 'Smokes Outside' : 'Smoker',
    profile.pets === 'has-pets' ? 'Has Pets' : 
      profile.pets === 'no-pets' ? 'No Pets' : 'Wants Pets',
    ...profile.dietaryPreferences.map(pref => 
      pref.charAt(0).toUpperCase() + pref.slice(1)
    )
  ];

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-lg mx-auto overflow-hidden relative shadow-xl transition-transform bg-white dark:bg-gray-900 border-none"
      style={{ 
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        height: '75vh',
        maxHeight: '700px',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Like overlay */}
      <div className="like-overlay absolute inset-0 bg-green-500 bg-opacity-30 z-10 opacity-0 transition-opacity flex items-center justify-center">
        <div className="transform rotate-[-30deg] border-4 border-white rounded-lg px-5 py-2">
          <span className="text-white text-4xl font-bold tracking-wide">LIKE</span>
        </div>
      </div>
      
      {/* Pass overlay */}
      <div className="pass-overlay absolute inset-0 bg-red-500 bg-opacity-30 z-10 opacity-0 transition-opacity flex items-center justify-center">
        <div className="transform rotate-[30deg] border-4 border-white rounded-lg px-5 py-2">
          <span className="text-white text-4xl font-bold tracking-wide">PASS</span>
        </div>
      </div>
      
      {/* XP Value indicator */}
      <div className="absolute top-4 left-4 bg-roomify-purple-light text-white rounded-full p-1 z-20 flex items-center">
        <span className="text-xs font-medium mx-1">+{profile.xpValue} XP</span>
      </div>
      
      {/* Super swipe star */}
      {isSuperSwipe && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-pulse">
          <div className="bg-yellow-400 rounded-full p-6 animate-spin-slow">
            <Star className="w-12 h-12 text-white" />
          </div>
        </div>
      )}
      
      {/* Photo navigation dots */}
      <div className="absolute top-2 left-0 right-0 z-20 flex justify-center gap-1">
        {profile.photoUrls.map((_, index) => (
          <div 
            key={index} 
            className={`h-1 rounded-full transition-all ${
              index === currentPhotoIndex 
                ? 'w-6 bg-white' 
                : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Photo container with navigation controls */}
      <div className="h-4/6 relative">
        {/* Use Avatar component if avatarUrl exists */}
        {profile.avatarUrl ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <Avatar className="h-64 w-64 rounded-full border-4 border-roomify-purple">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
              <AvatarFallback className="text-4xl bg-roomify-purple-light text-white">
                {profile.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <img 
            src={photoUrl} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        )}

        {renderCompatibilityBadge()}

        {/* Left/right buttons for photo navigation */}
        {!profile.avatarUrl && (
          <>
            {currentPhotoIndex > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white z-20"
              >
                ‹
              </button>
            )}
            
            {currentPhotoIndex < profile.photoUrls.length - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white z-20"
              >
                ›
              </button>
            )}
          </>
        )}
      </div>

      <CardContent className="p-4 flex flex-col space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-roomify-purple">{profile.name}, {profile.age}</h2>
            <span className="text-gray-500 text-sm">{profile.distance} miles away</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{profile.occupation}</p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{profile.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {lifestyleTags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-roomify-gray-light text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoommateCard;
