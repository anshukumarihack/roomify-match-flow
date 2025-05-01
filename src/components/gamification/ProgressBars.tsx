
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trophy, Flame } from 'lucide-react';

interface ProgressBarsProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  profileCompleteness: number;
  streakDays: number;
  nextRewardDays: number;
}

const ProgressBars: React.FC<ProgressBarsProps> = ({
  level,
  xp,
  xpToNextLevel,
  profileCompleteness,
  streakDays,
  nextRewardDays
}) => {
  // Calculate percentages
  const xpPercentage = Math.min(100, (xp / xpToNextLevel) * 100);
  
  // Calculate next reward threshold
  const rewardThresholds = [3, 7, 30]; // Days
  const nextReward = rewardThresholds.find(threshold => streakDays < threshold) || rewardThresholds[rewardThresholds.length - 1];
  const streakProgress = Math.min(100, (streakDays / nextReward) * 100);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Level {level}</span>
            <span className="text-sm font-medium">{xp}/{xpToNextLevel} XP</span>
          </div>
          <Progress value={xpPercentage} className="h-2.5" />
          <div className="mt-2 text-xs text-gray-500">
            {Math.floor(xpToNextLevel - xp)} XP until Level {level + 1}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-roomify-blue" />
            <span>Profile Completeness</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Profile</span>
            <span className="text-sm font-medium">{profileCompleteness}%</span>
          </div>
          <Progress value={profileCompleteness} className="h-2.5" />
          <div className="mt-2 text-xs text-gray-500">
            {profileCompleteness < 100 
              ? 'Complete your profile to get better matches!'
              : 'Profile complete! You\'re getting the best matches possible.'}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span>Daily Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">{streakDays} day{streakDays !== 1 ? 's' : ''}</span>
              {streakDays >= 7 && <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">🔥 On Fire!</span>}
            </div>
            <span className="text-sm font-medium">{streakDays}/{nextReward} days</span>
          </div>
          <Progress value={streakProgress} className="h-2.5" />
          <div className="mt-2 text-xs text-gray-500">
            {nextRewardDays > 0
              ? `${nextRewardDays} more day${nextRewardDays !== 1 ? 's' : ''} until your next reward!`
              : 'Claim your streak reward today!'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressBars;
