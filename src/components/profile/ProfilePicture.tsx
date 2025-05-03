
import React, { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { DialogContent } from '@/components/ui/dialog';
import AvatarSelector from './AvatarSelector';
import ProfilePictureOptions from './ProfilePictureOptions';
import ProfileAvatarDisplay from './ProfileAvatarDisplay';

interface ProfilePictureProps {
  userId?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  onImageChange?: (url: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userId,
  imageUrl,
  size = 'md',
  onImageChange
}) => {
  const [uploading, setUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  
  const uploadImage = async (file: File) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You need to be logged in to upload a profile picture",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // For demo purposes, we'll just create a blob URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // In a real implementation, we would upload to Supabase storage
      // Simulating server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully",
      });
      
      // Callback for parent component
      if (onImageChange) {
        onImageChange(objectUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setShowOptions(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadImage(file);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const triggerCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "user";
      fileInputRef.current.click();
    }
  };
  
  const handleAvatarSelect = (url: string) => {
    setPreviewUrl(url);
    
    if (onImageChange) {
      onImageChange(url);
    }
    
    toast({
      title: "Success",
      description: "Avatar selected successfully",
    });
    
    setShowAvatarSelector(false);
    setShowOptions(false);
  };
  
  return (
    <div className="relative">
      <ProfileAvatarDisplay 
        previewUrl={previewUrl}
        size={size}
        userId={userId}
        onClick={() => userId && setShowOptions(!showOptions)}
      />
      
      {showOptions && userId && (
        <ProfilePictureOptions 
          userId={userId}
          onClose={() => setShowOptions(false)}
          triggerFileInput={triggerFileInput}
          triggerCamera={triggerCamera}
          previewUrl={previewUrl}
          onSelectAvatar={handleAvatarSelect}
          showAvatarSelector={showAvatarSelector}
          setShowAvatarSelector={setShowAvatarSelector}
        />
      )}

      {showAvatarSelector && (
        <DialogContent>
          <AvatarSelector 
            selectedUrl={previewUrl} 
            onSelect={handleAvatarSelect} 
          />
        </DialogContent>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;
