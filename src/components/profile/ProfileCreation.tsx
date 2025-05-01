
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface ProfileCreationProps {
  onSaveProfile: (profileData: any) => void;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ onSaveProfile }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  
  const [profile, setProfile] = useState({
    age: '',
    gender: '',
    occupation: '',
    bio: '',
    sleepSchedule: '',
    cleanliness: 3,
    smoking: '',
    pets: '',
    dietaryPreferences: [],
    roommatePreferences: {
      ageRange: [20, 40],
      preferredGender: '',
      cleanliness: 3,
      smoking: '',
    }
  });

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateRoommatePreference = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      roommatePreferences: {
        ...prev.roommatePreferences,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress(newStep * 20);
  };

  const handlePrevious = () => {
    const newStep = step - 1;
    setStep(newStep);
    setProgress(newStep * 20);
  };

  const handleSubmit = () => {
    onSaveProfile(profile);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-roomify-purple">Complete Your Profile</h2>
        <p className="text-gray-600 dark:text-gray-400">Step {step} of 5</p>
        <Progress value={progress} className="h-2 mt-2" />
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Let's start with the basics about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => updateProfile('age', e.target.value)}
                placeholder="Your age"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup 
                value={profile.gender} 
                onValueChange={(value) => updateProfile('gender', value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-binary" id="non-binary" />
                  <Label htmlFor="non-binary">Non-binary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => updateProfile('occupation', e.target.value)}
                placeholder="What do you do?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                placeholder="Tell potential roommates a bit about yourself"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNext} className="bg-roomify-primary hover:bg-roomify-purple-dark">
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Lifestyle</CardTitle>
            <CardDescription>Tell us about your daily habits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sleepSchedule">Sleep Schedule</Label>
              <Select
                value={profile.sleepSchedule}
                onValueChange={(value) => updateProfile('sleepSchedule', value)}
              >
                <SelectTrigger id="sleepSchedule">
                  <SelectValue placeholder="Select your typical sleep schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early-bird">Early Bird (Early to bed, early to rise)</SelectItem>
                  <SelectItem value="night-owl">Night Owl (Late to bed, late to rise)</SelectItem>
                  <SelectItem value="mixed">Mixed (It varies)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cleanliness">Cleanliness Level (1-5)</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Relaxed</span>
                <Slider
                  id="cleanliness"
                  min={1}
                  max={5}
                  step={1}
                  value={[profile.cleanliness]}
                  onValueChange={([value]) => updateProfile('cleanliness', value)}
                  className="flex-grow"
                />
                <span className="text-sm text-gray-500">Neat Freak</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Smoking</Label>
              <RadioGroup 
                value={profile.smoking} 
                onValueChange={(value) => updateProfile('smoking', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-smoker" id="non-smoker" />
                  <Label htmlFor="non-smoker">Non-smoker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outside-only" id="outside-only" />
                  <Label htmlFor="outside-only">Outside only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smoker" id="smoker" />
                  <Label htmlFor="smoker">Smoker</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Pets</Label>
              <RadioGroup 
                value={profile.pets} 
                onValueChange={(value) => updateProfile('pets', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="has-pets" id="has-pets" />
                  <Label htmlFor="has-pets">I have pets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-pets" id="no-pets" />
                  <Label htmlFor="no-pets">No pets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="planning-pets" id="planning-pets" />
                  <Label htmlFor="planning-pets">Planning to get pets</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-roomify-primary hover:bg-roomify-purple-dark">
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Dietary Preferences</CardTitle>
            <CardDescription>Tell us about your eating habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Dietary Preferences</Label>
              <RadioGroup 
                value={profile.dietaryPreferences[0] || ''} 
                onValueChange={(value) => updateProfile('dietaryPreferences', [value])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="omnivore" id="omnivore" />
                  <Label htmlFor="omnivore">Omnivore (I eat everything)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pescatarian" id="pescatarian" />
                  <Label htmlFor="pescatarian">Pescatarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keto" id="keto" />
                  <Label htmlFor="keto">Keto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gluten-free" id="gluten-free" />
                  <Label htmlFor="gluten-free">Gluten-Free</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-roomify-primary hover:bg-roomify-purple-dark">
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Roommate Preferences</CardTitle>
            <CardDescription>What are you looking for in a roommate?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Gender</Label>
              <RadioGroup 
                value={profile.roommatePreferences.preferredGender} 
                onValueChange={(value) => updateRoommatePreference('preferredGender', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="pref-male" />
                  <Label htmlFor="pref-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="pref-female" />
                  <Label htmlFor="pref-female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-preference" id="pref-no-preference" />
                  <Label htmlFor="pref-no-preference">No preference</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pref-cleanliness">Cleanliness Preference (1-5)</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Relaxed</span>
                <Slider
                  id="pref-cleanliness"
                  min={1}
                  max={5}
                  step={1}
                  value={[profile.roommatePreferences.cleanliness]}
                  onValueChange={([value]) => updateRoommatePreference('cleanliness', value)}
                  className="flex-grow"
                />
                <span className="text-sm text-gray-500">Neat Freak</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Smoking Preference</Label>
              <RadioGroup 
                value={profile.roommatePreferences.smoking} 
                onValueChange={(value) => updateRoommatePreference('smoking', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-smoker-only" id="pref-non-smoker" />
                  <Label htmlFor="pref-non-smoker">Non-smoker only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outside-only" id="pref-outside-only" />
                  <Label htmlFor="pref-outside-only">Outside smoking only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-preference" id="pref-smoking-no-preference" />
                  <Label htmlFor="pref-smoking-no-preference">No preference</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-roomify-primary hover:bg-roomify-purple-dark">
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Photos</CardTitle>
            <CardDescription>
              Add some photos to your profile (min. 1, max. 6)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleSubmit} className="bg-roomify-primary hover:bg-roomify-purple-dark">
              Complete Profile
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ProfileCreation;
