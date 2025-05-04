
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCreation from '@/components/profile/ProfileCreation';
import { useAuth } from '@/context/AuthContext';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveProfile } = useAuth();

  const handleSaveProfile = (profileData: any) => {
    saveProfile(profileData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
      <ProfileCreation onSaveProfile={handleSaveProfile} />
    </div>
  );
};

export default ProfileCreationPage;
