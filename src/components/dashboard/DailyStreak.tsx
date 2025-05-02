
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface DailyStreakProps {
  streakDays: number;
}

const DailyStreak: React.FC<DailyStreakProps> = ({ streakDays }) => {
  return (
    <Card className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border-orange-200 dark:border-orange-800/50">
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
  );
};

export default DailyStreak;
