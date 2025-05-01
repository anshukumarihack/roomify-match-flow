
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCreation from '@/components/profile/ProfileCreation';
import { toast } from '@/components/ui/use-toast';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSaveProfile = (profileData: any) => {
    // In a real app, this would call an API
    console.log('Profile data:', profileData);
    
    toast({
      title: "Profile created!",
      description: "You earned +100 XP!"
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
      <ProfileCreation onSaveProfile={handleSaveProfile} />
    </div>
  );
};

export default ProfileCreationPage;
