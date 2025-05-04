
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Heart, User, Home, Clock, Utensils, Briefcase, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  compatibility: number;
  personality: string;
  sleepSchedule: string;
  cleanliness: string;
  workSchedule: string;
  dietPreference: string;
  interests: string;
  avatarUrl: string;
  location: string;
}

interface RoommateCardProps {
  profile: RoommateProfile;
  onLike: () => void;
  onReject: () => void;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile, onLike, onReject }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const compatibilityColor = profile.compatibility >= 90 
    ? 'text-green-500' 
    : profile.compatibility >= 80 
      ? 'text-blue-500' 
      : 'text-yellow-500';
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <Card className="w-full overflow-hidden h-full shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="relative h-96 cursor-pointer" onClick={toggleDetails}>
        <img 
          src={profile.avatarUrl}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-bold">{profile.name}, {profile.age}</h3>
              <p className="text-white/80">{profile.occupation}</p>
              <p className="text-white/60 text-sm">{profile.location}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center">
              <span className={`text-lg font-bold ${compatibilityColor}`}>{profile.compatibility}%</span>
              <span className="text-xs ml-1">match</span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className={cn(
        "transition-all duration-300 overflow-hidden",
        showDetails ? "max-h-[500px] p-4" : "max-h-0 p-0"
      )}>
        <h4 className="font-semibold mb-2">Bio</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{profile.bio}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">{profile.personality}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">{profile.sleepSchedule}</span>
          </div>
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">{profile.cleanliness}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">{profile.workSchedule}</span>
          </div>
          <div className="flex items-center">
            <Utensils className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">{profile.dietPreference}</span>
          </div>
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-2 text-roomify-purple" />
            <span className="text-sm">Interests</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {profile.interests.split(', ').map((interest, index) => (
            <Badge key={index} variant="secondary" className="bg-roomify-purple/10 text-roomify-purple hover:bg-roomify-purple/20">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 flex justify-between">
        <Button 
          onClick={onReject}
          className="rounded-full w-14 h-14 bg-white hover:bg-red-50 border border-gray-200 shadow-lg"
        >
          <X className="h-8 w-8 text-red-500" />
        </Button>
        
        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="rounded-full w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            {showDetails 
              ? <polyline points="18 15 12 9 6 15"></polyline>
              : <polyline points="6 9 12 15 18 9"></polyline>
            }
          </svg>
        </Button>
        
        <Button
          onClick={onLike}
          className="rounded-full w-14 h-14 bg-white hover:bg-green-50 border border-gray-200 shadow-lg"
        >
          <Heart className="h-8 w-8 text-green-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoommateCard;
