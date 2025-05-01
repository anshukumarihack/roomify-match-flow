
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Star, Sparkles, Flame, Award, ArrowRight } from 'lucide-react';
import ProgressBars from '../gamification/ProgressBars';
import { useNavigate } from 'react-router-dom';

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // User stats state
  const [level, setLevel] = useState(2);
  const [xp, setXp] = useState(230);
  const [xpToNextLevel, setXpToNextLevel] = useState(500);
  const [streakDays, setStreakDays] = useState(5);
  const [profileCompleteness, setProfileCompleteness] = useState(85);
  
  // Compatibility data for radar chart
  const compatibilityData = [
    { subject: 'Cleanliness', A: 80 },
    { subject: 'Schedule', A: 65 },
    { subject: 'Lifestyle', A: 90 },
    { subject: 'Personality', A: 75 },
    { subject: 'Interests', A: 60 }
  ];
  
  // Badges
  const badges: BadgeType[] = [
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

  return (
    <div className="container mx-auto p-4 pb-20 space-y-6">
      {/* Header with level and stats */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-roomify-purple">Welcome Back!</h1>
          <div className="flex items-center mt-1">
            <span className="bg-roomify-purple text-white text-xs px-2 py-1 rounded-full mr-2">
              Level {level}
            </span>
            <span className="text-sm text-gray-600">{xp} XP</span>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/swipe')}
          className="bg-roomify-primary hover:bg-roomify-purple-dark"
        >
          Start Matching
        </Button>
      </div>
      
      {/* Progress bars section */}
      <ProgressBars
        level={level}
        xp={xp}
        xpToNextLevel={xpToNextLevel}
        profileCompleteness={profileCompleteness}
        streakDays={streakDays}
        nextRewardDays={getNextRewardDays()}
      />
      
      {/* Compatibility radar chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compatibility Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={compatibilityData} outerRadius="70%">
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Compatibility"
                  dataKey="A"
                  stroke="#9b87f5"
                  fill="#9b87f5"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Badges section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Badges</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/badges')}
            className="text-roomify-blue"
          >
            See All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map(badge => (
            <Card key={badge.id} className={`border ${badge.unlocked ? 'border-roomify-purple-light' : 'border-gray-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${badge.unlocked ? 'bg-roomify-purple-light/20' : 'bg-gray-100'}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{badge.name}</h3>
                      {badge.unlocked && (
                        <Badge className="ml-2 bg-roomify-green text-white">Unlocked</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                    {!badge.unlocked && badge.progress !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">
                        Progress: {badge.progress}/{badge.total}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Daily Streak Card */}
      <Card className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Daily Streak</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                You're on a {streakDays}-day streak! Keep it up!
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{streakDays}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
