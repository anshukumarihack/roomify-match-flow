
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Match {
  id: string;
  name: string;
  photoUrl?: string;
  avatarUrl?: string;
  lastActive: string;
  compatibility: number;
  hasUnreadMessages: boolean;
  matchDate: string;
  personality?: string;
  sleep_time?: string;
  cleanliness?: string;
}

// Function to generate mock match data
const generateMockMatches = (count: number): Match[] => {
  const personalities = ['Introvert', 'Extrovert', 'Ambivert', 'Reserved', 'Outgoing', 'Quiet', 'Sociable'];
  const sleepTimes = ['Early bird', 'Night owl', 'Flexible', 'Standard'];
  const cleanlinessLevels = ['Very neat', 'Average', 'Relaxed', 'Minimal', 'Meticulous'];
  const lastActiveTimes = ['Just now', '5 min ago', '10 min ago', '30 min ago', '1 hour ago', '3 hours ago', 'Yesterday'];
  const matchDates = ['Just now', 'Today', 'Yesterday', '2 days ago', '3 days ago', 'Last week', '2 weeks ago'];
  const names = [
    'Emma Wilson', 'James Rodriguez', 'Sarah Chen', 'Michael Taylor', 'Olivia Brown',
    'Noah Martinez', 'Sophia Johnson', 'Ethan Williams', 'Ava Jones', 'Liam Garcia',
    'Isabella Miller', 'Mason Davis', 'Mia Hernandez', 'Jacob Smith', 'Charlotte Wilson',
    'William Anderson', 'Amelia Thomas', 'Benjamin Moore', 'Abigail Jackson', 'Lucas White',
    'Emily Harris', 'Alexander Martin', 'Elizabeth Thompson', 'Daniel Garcia', 'Sofia Robinson',
    'Matthew Lewis', 'Avery Walker', 'Henry Hall', 'Scarlett Young', 'Joseph Allen'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `match-${i + 1}`,
    name: names[i % names.length],
    avatarUrl: `https://source.unsplash.com/collection/1346951/150x150?${i + 1}`,
    lastActive: lastActiveTimes[Math.floor(Math.random() * lastActiveTimes.length)],
    compatibility: Math.floor(Math.random() * 30) + 70, // 70-100% compatibility
    hasUnreadMessages: Math.random() > 0.7, // 30% chance of having unread messages
    matchDate: matchDates[Math.floor(Math.random() * matchDates.length)],
    personality: personalities[Math.floor(Math.random() * personalities.length)],
    sleep_time: sleepTimes[Math.floor(Math.random() * sleepTimes.length)],
    cleanliness: cleanlinessLevels[Math.floor(Math.random() * cleanlinessLevels.length)]
  }));
};

const MatchList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Try to get matches from Supabase
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .limit(25);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map Supabase data to our Match interface
          const mappedMatches: Match[] = data.map(match => ({
            id: match.id.toString(),
            name: match.name || 'Unknown',
            lastActive: getRandomLastActive(),
            compatibility: Math.floor(Math.random() * 30) + 70, // Random compatibility between 70-100%
            hasUnreadMessages: Math.random() > 0.7, // 30% chance of having unread messages
            matchDate: getRandomMatchDate(),
            avatarUrl: `https://source.unsplash.com/collection/1346951/150x150?${match.id}`,
            personality: match.personality,
            sleep_time: match.sleep_time?.toString(),
            cleanliness: match.cleanliness?.toString()
          }));
          
          setMatches(mappedMatches);
        } else {
          // Fallback to mock data if no matches found
          const mockMatches = generateMockMatches(25);
          setMatches(mockMatches);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        // Fallback to mock data on error
        const mockMatches = generateMockMatches(25);
        setMatches(mockMatches);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, []);

  const handleMessageClick = (matchId: string) => {
    navigate(`/messages/${matchId}`);
  };

  const handleProfileClick = (matchId: string) => {
    navigate(`/profile/${matchId}`);
  };

  // Helper function to generate random last active times
  const getRandomLastActive = (): string => {
    const options = ['Just now', '5 min ago', '1 hour ago', '3 hours ago', 'Yesterday'];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Helper function to generate random match dates
  const getRandomMatchDate = (): string => {
    const options = ['Just now', 'Today', 'Yesterday', '2 days ago', 'Last week'];
    return options[Math.floor(Math.random() * options.length)];
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Your Matches ({matches.length})</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-roomify-purple-light border-t-roomify-purple rounded-full animate-spin"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
          <p className="text-gray-600 mb-6">Start swiping to find your perfect roommate!</p>
          <Button 
            onClick={() => navigate('/swipe')}
            className="bg-roomify-primary hover:bg-roomify-purple-dark"
          >
            Find Matches
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map(match => (
            <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar 
                      className="h-24 w-24 cursor-pointer rounded-none"
                      onClick={() => handleProfileClick(match.id)}
                    >
                      <AvatarImage 
                        src={match.avatarUrl} 
                        alt={match.name} 
                      />
                      <AvatarFallback className="bg-roomify-purple-light text-white text-xl">
                        {match.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {match.matchDate === 'Just now' && (
                      <div className="absolute top-0 left-0 bg-roomify-green text-white text-xs px-2 py-1">
                        New Match!
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-roomify-purple" onClick={() => handleProfileClick(match.id)} style={{cursor: 'pointer'}}>
                          {match.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Badge className="mr-2 bg-roomify-purple-light text-white">
                            {match.compatibility}% Match
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Active {match.lastActive}
                          </span>
                        </div>
                        
                        {/* Additional match details */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {match.personality && (
                            <Badge variant="outline" className="text-xs border-gray-300">
                              {match.personality}
                            </Badge>
                          )}
                          {match.sleep_time && (
                            <Badge variant="outline" className="text-xs border-gray-300">
                              {match.sleep_time}
                            </Badge>
                          )}
                          {match.cleanliness && (
                            <Badge variant="outline" className="text-xs border-gray-300">
                              {match.cleanliness}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full p-2"
                          title="Add to favorites"
                        >
                          <Star className="h-5 w-5" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleMessageClick(match.id)}
                          className="bg-roomify-primary hover:bg-roomify-purple-dark rounded-full relative"
                        >
                          <MessageCircle className="h-5 w-5" />
                          {match.hasUnreadMessages && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                              !
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Matched {match.matchDate}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;
