
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

interface ProfileAvatarDisplayProps {
  previewUrl?: string;
  size: 'sm' | 'md' | 'lg';
  userId?: string;
  onClick: () => void;
}

const ProfileAvatarDisplay: React.FC<ProfileAvatarDisplayProps> = ({
  previewUrl,
  size,
  userId,
  onClick
}) => {
  const sizeClasses = {
    'sm': 'h-16 w-16',
    'md': 'h-24 w-24',
    'lg': 'h-32 w-32'
  };

  const getInitials = (userId?: string) => {
    return userId ? userId.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} cursor-pointer group`}
      onClick={onClick}
    >
      <Avatar className={`${sizeClasses[size]} border-2 border-roomify-purple transition-all duration-300 ${userId ? 'avatar-glow hover:scale-105' : ''}`}>
        <AvatarImage src={previewUrl} className="object-cover" />
        <AvatarFallback className="bg-gradient-to-br from-roomify-purple to-roomify-purple-dark text-white">
          {getInitials(userId)}
        </AvatarFallback>
      </Avatar>
      
      {userId && (
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
          <Upload className="h-6 w-6 text-white" />
        </div>
      )}
    </div>
  );
};

export default ProfileAvatarDisplay;
