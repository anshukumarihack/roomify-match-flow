
import React from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Image } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AvatarSelector from './AvatarSelector';

interface ProfilePictureOptionsProps {
  userId?: string;
  onClose: () => void;
  triggerFileInput: () => void;
  triggerCamera: () => void;
  previewUrl?: string;
  onSelectAvatar: (url: string) => void;
  showAvatarSelector: boolean;
  setShowAvatarSelector: (show: boolean) => void;
}

const ProfilePictureOptions: React.FC<ProfilePictureOptionsProps> = ({
  userId,
  onClose,
  triggerFileInput,
  triggerCamera,
  previewUrl,
  onSelectAvatar,
  showAvatarSelector,
  setShowAvatarSelector
}) => {
  if (!userId) return null;

  return (
    <div className="absolute mt-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48 border border-gray-200 dark:border-gray-700 animate-fade-in">
      <Dialog open={showAvatarSelector} onOpenChange={setShowAvatarSelector}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-start mb-1 hover:bg-roomify-purple/10 group transition-colors duration-200"
          >
            <Image className="mr-2 h-4 w-4 group-hover:text-roomify-purple transition-colors duration-200" /> 
            <span className="group-hover:text-roomify-purple transition-colors duration-200">Choose Avatar</span>
          </Button>
        </DialogTrigger>
      </Dialog>
      
      <Button 
        variant="ghost" 
        className="w-full justify-start mb-1 hover:bg-roomify-purple/10 group transition-colors duration-200"
        onClick={triggerFileInput}
      >
        <Upload className="mr-2 h-4 w-4 group-hover:text-roomify-purple transition-colors duration-200" /> 
        <span className="group-hover:text-roomify-purple transition-colors duration-200">Upload Image</span>
      </Button>
      <Button 
        variant="ghost" 
        className="w-full justify-start hover:bg-roomify-purple/10 group transition-colors duration-200"
        onClick={triggerCamera}
      >
        <Camera className="mr-2 h-4 w-4 group-hover:text-roomify-purple transition-colors duration-200" /> 
        <span className="group-hover:text-roomify-purple transition-colors duration-200">Take Photo</span>
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1 bg-white dark:bg-gray-800 shadow-md hover:bg-roomify-purple hover:text-white transition-colors duration-200"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProfilePictureOptions;
