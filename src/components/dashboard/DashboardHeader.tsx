
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../profile/ProfilePicture';

interface DashboardHeaderProps {
  level: number;
  xp: number;
  profileImageUrl: string | undefined;
  onImageChange: (url: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  level,
  xp,
  profileImageUrl,
  onImageChange,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <ProfilePicture 
            userId="user-123"
            imageUrl={profileImageUrl}
            size="md"
            onImageChange={onImageChange}
          />
          <div>
            <h1 className="text-2xl font-bold text-roomify-purple">Welcome Back!</h1>
            <div className="flex items-center mt-1">
              <span className="bg-roomify-purple text-white text-xs px-2 py-1 rounded-full mr-2">
                Level {level}
              </span>
              <span className="text-sm text-gray-600">{xp} XP</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/swipe')}
          className="bg-roomify-primary hover:bg-roomify-purple-dark"
        >
          Start Matching
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
