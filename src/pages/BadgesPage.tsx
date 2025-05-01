
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Award, Sparkles, Trophy, Utensils, Flame } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
  category: string;
}

const BadgesPage: React.FC = () => {
  const badges: Badge[] = [
    // Lifestyle badges
    {
      id: '1',
      name: 'Early Bird',
      description: 'Match with 5 roommates with similar sleep schedules',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      unlocked: true,
      category: 'Lifestyle'
    },
    {
      id: '2',
      name: 'Night Owl',
      description: 'Match with 3 night owls',
      icon: <Star className="h-6 w-6 text-blue-500" />,
      unlocked: false,
      progress: 1,
      total: 3,
      category: 'Lifestyle'
    },
    {
      id: '3',
      name: 'Clean Crew',
      description: 'Connect with 5 high-cleanliness users',
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      unlocked: false,
      progress: 3,
      total: 5,
      category: 'Lifestyle'
    },
    
    // Foodie badges
    {
      id: '4',
      name: 'Foodie Match',
      description: 'Match with 3+ vegan/vegetarian roommates',
      icon: <Utensils className="h-6 w-6 text-green-500" />,
      unlocked: false,
      progress: 1,
      total: 3,
      category: 'Food'
    },
    {
      id: '5',
      name: 'Kitchen Master',
      description: 'Match with 5 roommates who love to cook',
      icon: <Utensils className="h-6 w-6 text-orange-500" />,
      unlocked: false,
      progress: 2,
      total: 5,
      category: 'Food'
    },
    
    // Achievement badges
    {
      id: '6',
      name: 'Perfect Match',
      description: 'Match with someone with 95%+ compatibility',
      icon: <Trophy className="h-6 w-6 text-purple-500" />,
      unlocked: true,
      category: 'Achievements'
    },
    {
      id: '7',
      name: 'Social Butterfly',
      description: 'Message with 10 different matches',
      icon: <Award className="h-6 w-6 text-pink-500" />,
      unlocked: false,
      progress: 3,
      total: 10,
      category: 'Achievements'
    },
    {
      id: '8',
      name: 'Weekly Streak',
      description: 'Login 7 days in a row',
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      unlocked: false,
      progress: 5,
      total: 7,
      category: 'Achievements'
    }
  ];

  // Group badges by category
  const categories = badges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Your Badges</h1>
      
      <div className="mb-6">
        <div className="bg-gradient-to-r from-roomify-purple-light to-roomify-purple rounded-lg p-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Badge Progress</h2>
            <p className="text-sm opacity-90">Unlock badges to level up faster!</p>
          </div>
          <div className="text-3xl font-bold">
            {badges.filter(b => b.unlocked).length}/{badges.length}
          </div>
        </div>
      </div>
      
      {Object.entries(categories).map(([category, categoryBadges]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category} Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryBadges.map(badge => (
              <Card 
                key={badge.id} 
                className={`border ${badge.unlocked ? 'border-roomify-purple-light' : 'border-gray-200'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      badge.unlocked 
                        ? 'bg-roomify-purple-light/20' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{badge.name}</h3>
                        {badge.unlocked && (
                          <div className="bg-roomify-purple text-white text-xs rounded-full px-2 py-1">
                            Unlocked
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                      
                      {!badge.unlocked && badge.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{badge.progress} / {badge.total}</span>
                            <span>{Math.round((badge.progress / badge.total) * 100)}%</span>
                          </div>
                          <Progress value={(badge.progress / badge.total) * 100} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgesPage;
