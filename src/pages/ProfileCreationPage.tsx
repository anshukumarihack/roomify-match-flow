
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCreation from '@/components/profile/ProfileCreation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveProfile, user } = useAuth();

  const handleSaveProfile = (profileData: any) => {
    saveProfile(profileData);
    navigate('/dashboard');
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
            Create Your Profile
          </motion.h1>
        </div>

        {user && (
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden h-24 w-24 border-4 border-roomify-purple shadow-lg mb-3">
                <img src={user.avatarUrl} alt="Your avatar" className="h-full w-full object-cover" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Your profile avatar</p>
            </div>
          </motion.div>
        )}
        
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
