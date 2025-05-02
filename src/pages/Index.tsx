
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Star, Flame, Badge as BadgeIcon, House, Sparkles, MessageCircle, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stats for dashboard
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalMessagesReceived: 0,
    activityStreak: 5,
    profileCompleteness: 85,
    level: 2,
    xp: 230,
    xpToNextLevel: 500,
  });
  
  // Add floating animation to icons
  useEffect(() => {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      const delay = index * 0.5;
      const element = icon as HTMLElement;
      element.style.animationDelay = `${delay}s`;
    });
    
    // Fetch recent matches
    const fetchRecentMatches = async () => {
      try {
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .limit(4);
        
        if (error) throw error;
        
        if (data) {
          setRecentMatches(data);
          setStats(prev => ({
            ...prev,
            totalMatches: data.length
          }));
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentMatches();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section for logged out users */}
      {!localStorage.getItem('is_logged_in') && (
        <div className="relative bg-gradient-to-br from-roomify-purple-light to-roomify-purple text-white py-20 px-4">
          {/* Floating icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <House className="absolute top-[10%] left-[10%] text-white/20 w-16 h-16 floating-icon animate-float" />
            <Star className="absolute top-[15%] right-[15%] text-yellow-300/30 w-12 h-12 floating-icon animate-float" />
            <Flame className="absolute bottom-[20%] left-[20%] text-orange-400/20 w-14 h-14 floating-icon animate-float" />
            <BadgeIcon className="absolute bottom-[25%] right-[25%] text-blue-300/20 w-10 h-10 floating-icon animate-float" />
            <Sparkles className="absolute top-[40%] right-[40%] text-yellow-200/20 w-8 h-8 floating-icon animate-float" />
          </div>
          
          <div className="container mx-auto text-center relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Roommate Match
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Swipe, match, and connect with compatible roommates. 
              Our gamified platform helps you find the ideal person to share your space.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-roomify-purple hover:bg-gray-100"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                I Already Have an Account
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Dashboard for logged in users */}
      {(localStorage.getItem('is_logged_in') || true) && (
        <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4 flex-1">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User profile summary */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-4 border-roomify-purple">
                    <AvatarImage src="https://source.unsplash.com/random/200x200?person&profile" />
                    <AvatarFallback className="bg-roomify-purple-light text-white text-2xl">YOU</AvatarFallback>
                  </Avatar>
                  
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
                  <Button className="w-full bg-roomify-primary" onClick={() => navigate('/create-profile')}>
                    Complete Your Profile
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
              
              {/* Quick actions */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                  <CardDescription>Your latest compatible roommates</CardDescription>
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
                            <AvatarImage src={`https://source.unsplash.com/random/200x200?person&${match.id}`} alt={match.name} />
                            <AvatarFallback className="bg-roomify-purple-light text-white text-xl">
                              {match.name?.substring(0, 2).toUpperCase() || "RM"}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium text-roomify-purple">{match.name || "Roommate"}</h3>
                          <p className="text-sm text-gray-500 mb-3">{match.personality || "Compatible roommate"}</p>
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
      )}
      
      {/* Features Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-roomify-purple">
            Find Roommates That Match Your Lifestyle
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-roomify-purple/10 w-fit mb-4">
                <Star className="h-8 w-8 text-roomify-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our algorithm matches you with roommates based on lifestyle, habits, and preferences.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 w-fit mb-4">
                <BadgeIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gain XP, level up, and unlock badges as you use the app and find great matches.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 w-fit mb-4">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Streaks</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your streak by logging in daily for special rewards and bonuses.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-roomify-purple">
            Ready to Find Your Perfect Roommate?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Join thousands of users who have already found their ideal living situations through Roomify.
          </p>
          <Button
            size="lg"
            className="bg-roomify-primary hover:bg-roomify-purple-dark"
            onClick={() => navigate('/signup')}
          >
            Create Your Account
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Roomify</h2>
              <p className="text-gray-400">Find your perfect roommate match</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Roomify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
