
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCreation from '@/components/profile/ProfileCreation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();

  const handleSaveProfile = (profileData: any) => {
    updateUserProfile(profileData);
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-roomify-purple/5 dark:from-gray-900 dark:to-roomify-purple/20 pt-4 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2 rounded-full hover:bg-roomify-purple/10"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <motion.h1 
            className="text-2xl font-bold text-roomify-purple ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Set Your Preferences
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ProfileCreation onSaveProfile={handleSaveProfile} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;
