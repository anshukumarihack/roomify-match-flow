
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

interface BadgesDisplayProps {
  badges: BadgeType[];
}

const BadgesDisplay: React.FC<BadgesDisplayProps> = ({ badges }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Recent Badges</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/badges')}
          className="text-roomify-blue"
        >
          See All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {badges.map(badge => (
            <div key={badge.id} className={`p-3 rounded-md flex items-center space-x-3 ${badge.unlocked ? 'bg-roomify-purple-light/10' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className={`p-2 rounded-full ${badge.unlocked ? 'bg-roomify-purple-light/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {badge.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{badge.name}</h3>
                  {badge.unlocked && (
                    <Badge className="ml-2 bg-roomify-green text-white">Unlocked</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{badge.description}</p>
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-roomify-purple h-full rounded-full" 
                      style={{ width: `${(badge.progress / badge.total!) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesDisplay;
