
import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import AvatarSelector from './AvatarSelector';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
  
  const sizeClasses = {
    'sm': 'h-16 w-16',
    'md': 'h-24 w-24',
    'lg': 'h-32 w-32'
  };

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
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);
        
      const publicUrl = data.publicUrl;
      
      // Update preview
      setPreviewUrl(publicUrl);
      
      // Callback for parent component
      if (onImageChange) {
        onImageChange(publicUrl);
      }
      
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully",
      });
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
      
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
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
  };
  
  const getInitials = (userId?: string) => {
    return userId ? userId.substring(0, 2).toUpperCase() : 'U';
  };
  
  return (
    <div className="relative">
      <div 
        className={`relative ${sizeClasses[size]} cursor-pointer group`}
        onClick={() => userId && setShowOptions(!showOptions)}
      >
        <Avatar className={`${sizeClasses[size]} border-2 border-roomify-purple avatar-glow`}>
          <AvatarImage src={previewUrl} />
          <AvatarFallback className="bg-roomify-purple-light text-white">
            {getInitials(userId)}
          </AvatarFallback>
        </Avatar>
        
        {userId && (
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      
      {showOptions && userId && (
        <div className="absolute mt-2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48">
          <Dialog open={showAvatarSelector} onOpenChange={setShowAvatarSelector}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-1"
              >
                <Image className="mr-2 h-4 w-4" /> Choose Avatar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AvatarSelector 
                selectedUrl={previewUrl} 
                onSelect={handleAvatarSelect} 
              />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start mb-1"
            onClick={() => triggerFileInput()}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={triggerCamera}
          >
            <Camera className="mr-2 h-4 w-4" /> Take Photo
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1"
            onClick={() => setShowOptions(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
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
