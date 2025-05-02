
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ProfilePicture from '@/components/profile/ProfilePicture';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated"
    });
  };

  return (
    <div className="container mx-auto p-4 pb-20 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <ProfilePicture 
                userId="user-123"
                size="md"
              />
              <div className="flex-1">
                <h3 className="font-medium">Profile Picture</h3>
                <p className="text-sm text-gray-500 mb-2">Update your profile picture or avatar</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="Guest User" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Looking for a compatible roommate" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base">Theme</Label>
              <RadioGroup defaultValue="system" className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="cursor-pointer">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="cursor-pointer">System</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications for matches and messages</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-updates" className="text-base">Email Updates</Label>
                  <p className="text-sm text-gray-500">Receive email notifications about your account</p>
                </div>
                <Switch id="email-updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="privacy" className="text-base">Profile Privacy</Label>
                  <p className="text-sm text-gray-500">Make your profile visible only to matches</p>
                </div>
                <Switch id="privacy" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-roomify-primary">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
