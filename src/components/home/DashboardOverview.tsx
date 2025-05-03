
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Users, Flame, Badge as BadgeIcon, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ProfilePicture from '@/components/profile/ProfilePicture';

interface DashboardOverviewProps {
  isLoggedIn: boolean;
  stats: {
    totalMatches: number;
    totalMessagesReceived: number;
    activityStreak: number;
    profileCompleteness: number;
    level: number;
    xp: number;
    xpToNextLevel: number;
  };
  recentMatches: any[];
  loading: boolean;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  isLoggedIn, 
  stats, 
  recentMatches, 
  loading 
}) => {
  const navigate = useNavigate();
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>(undefined);
  
  if (!isLoggedIn) {
    return null;
  }
  
  // Mock user ID for demo purposes
  const mockUserId = 'user-123';

  const handleProfileImageChange = (url: string) => {
    setProfilePicUrl(url);
    console.log("Profile image changed:", url);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4 flex-1">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User profile summary */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ProfilePicture
                userId={mockUserId}
                imageUrl={profilePicUrl}
                onImageChange={handleProfileImageChange}
                size="lg"
              />
              
              <div className="text-center">
                <h3 className="text-xl font-semibold">Guest User</h3>
                <div className="flex items-center justify-center mt-1">
                  <Badge className="bg-roomify-purple text-white">Level {stats.level}</Badge>
                  <span className="ml-2 text-sm text-gray-500">{stats.xp}/{stats.xpToNextLevel} XP</span>
                </div>
              </div>
              
              <div className="w-full space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Level Progress</span>
                    <span>{Math.round((stats.xp / stats.xpToNextLevel) * 100)}%</span>
                  </div>
                  <Progress value={(stats.xp / stats.xpToNextLevel) * 100} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completeness</span>
                    <span>{stats.profileCompleteness}%</span>
                  </div>
                  <Progress value={stats.profileCompleteness} className="h-2 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-green-500 rounded-full" style={{width: `${stats.profileCompleteness}%`}}></div>
                  </Progress>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-roomify-primary" onClick={() => navigate('/settings')}>
                Manage Your Profile
              </Button>
            </CardFooter>
          </Card>
          
          {/* Activity stats */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-roomify-purple/10 rounded-lg">
                  <div className="rounded-full bg-roomify-purple/20 p-2 mb-2">
                    <Users className="h-6 w-6 text-roomify-purple" />
                  </div>
                  <div className="text-2xl font-bold">{stats.totalMatches}</div>
                  <div className="text-sm text-gray-500">Total Matches</div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="rounded-full bg-blue-200 dark:bg-blue-800 p-2 mb-2">
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold">{stats.totalMessagesReceived}</div>
                  <div className="text-sm text-gray-500">Messages</div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <div className="rounded-full bg-orange-200 dark:bg-orange-800 p-2 mb-2">
                    <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold">{stats.activityStreak}</div>
                  <div className="text-sm text-gray-500">Day Streak</div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="rounded-full bg-green-200 dark:bg-green-800 p-2 mb-2">
                    <BadgeIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-500">Badges</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </Button>
              <Button className="bg-roomify-primary" onClick={() => navigate('/swipe')}>
                Start Matching
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent matches */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>Your latest compatible roommates</CardDescription>
              </div>
              <Button 
                variant="outline" 
                className="text-roomify-purple border-roomify-purple"
                onClick={() => navigate('/matches')}
              >
                View All ({stats.totalMatches})
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-10 h-10 border-4 border-roomify-purple-light border-t-roomify-purple rounded-full animate-spin"></div>
                </div>
              ) : recentMatches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {recentMatches.map(match => (
                    <div key={match.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src={`https://source.unsplash.com/collection/1346951/150x150?${match.id}`} alt={match.name} />
                        <AvatarFallback className="bg-roomify-purple-light text-white text-xl">
                          {match.name?.substring(0, 2).toUpperCase() || "RM"}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-roomify-purple">{match.name || "Roommate"}</h3>
                      <p className="text-sm text-gray-500 mb-1">{match.personality || "Compatible roommate"}</p>
                      <div className="mb-3">
                        <Badge className="bg-roomify-purple/20 text-roomify-purple text-xs">
                          {match.compatibility || Math.floor(Math.random() * 15) + 85}% Match
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-roomify-purple text-roomify-purple hover:bg-roomify-purple hover:text-white"
                        onClick={() => navigate(`/messages/${match.id}`)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" /> Message
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You haven't matched with anyone yet.</p>
                  <Button className="mt-4 bg-roomify-primary" onClick={() => navigate('/swipe')}>
                    Start Matching Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
