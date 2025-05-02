
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardMenu from './DashboardMenu';
import ProgressBars from '../gamification/ProgressBars';
import CompatibilityChart from './CompatibilityChart';
import BadgesDisplay from './BadgesDisplay';
import DailyStreak from './DailyStreak';
import { Star, Sparkles, Award } from 'lucide-react';

const Dashboard: React.FC = () => {  
  // User stats state
  const [level, setLevel] = useState(2);
  const [xp, setXp] = useState(230);
  const [xpToNextLevel, setXpToNextLevel] = useState(500);
  const [streakDays, setStreakDays] = useState(5);
  const [profileCompleteness, setProfileCompleteness] = useState(85);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);
  
  // Compatibility data for radar chart
  const compatibilityData = [
    { subject: 'Cleanliness', A: 80 },
    { subject: 'Schedule', A: 65 },
    { subject: 'Lifestyle', A: 90 },
    { subject: 'Personality', A: 75 },
    { subject: 'Interests', A: 60 }
  ];
  
  // Badges
  const badges = [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Match with 5 roommates with similar sleep schedules',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      unlocked: true
    },
    {
      id: '2',
      name: 'Clean Crew',
      description: 'Connect with high-cleanliness users',
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      unlocked: false,
      progress: 3,
      total: 5
    },
    {
      id: '3',
      name: 'Foodie Match',
      description: 'Match with 3+ vegan/vegetarian roommates',
      icon: <Award className="h-6 w-6 text-green-500" />,
      unlocked: false,
      progress: 1,
      total: 3
    }
  ];
  
  // Calculate next reward days
  const getNextRewardDays = () => {
    if (streakDays < 3) return 3 - streakDays;
    if (streakDays < 7) return 7 - streakDays;
    if (streakDays < 30) return 30 - streakDays;
    return 0;
  };
  
  const handleImageChange = (url: string) => {
    setProfileImageUrl(url);
  };

  return (
    <div className="container mx-auto p-4 pb-20 space-y-6">
      {/* Header with level and profile */}
      <DashboardHeader 
        level={level}
        xp={xp}
        profileImageUrl={profileImageUrl}
        onImageChange={handleImageChange}
      />
      
      {/* Main dashboard menu */}
      <DashboardMenu />
      
      {/* Progress bars section */}
      <ProgressBars
        level={level}
        xp={xp}
        xpToNextLevel={xpToNextLevel}
        profileCompleteness={profileCompleteness}
        streakDays={streakDays}
        nextRewardDays={getNextRewardDays()}
      />
      
      {/* Two column layout for charts and badges */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Compatibility radar chart */}
        <CompatibilityChart data={compatibilityData} />
        
        {/* Badges section */}
        <BadgesDisplay badges={badges} />
      </div>
      
      {/* Daily Streak Card */}
      <DailyStreak streakDays={streakDays} />
    </div>
  );
};

export default Dashboard;
