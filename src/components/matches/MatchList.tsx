
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  compatibility: number;
  interests: string;
  avatarUrl: string;
  lastActive: string;
}

const MatchList: React.FC = () => {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Top 5 best matches
    const topMatches: MatchProfile[] = [
      {
        id: '1',
        name: 'Emma Wilson',
        age: 26,
        compatibility: 98,
        interests: 'Reading, Hiking, Cooking',
        avatarUrl: 'https://i.pravatar.cc/300?u=emma-wilson',
        lastActive: 'Just now'
      },
      {
        id: '2',
        name: 'James Rodriguez',
        age: 29,
        compatibility: 95,
        interests: 'Gaming, Movies, Technology',
        avatarUrl: 'https://i.pravatar.cc/300?u=james-rodriguez',
        lastActive: '5 min ago'
      },
      {
        id: '3',
        name: 'Sarah Chen',
        age: 24,
        compatibility: 92,
        interests: 'Music, Art, Travel',
        avatarUrl: 'https://i.pravatar.cc/300?u=sarah-chen',
        lastActive: '2 hours ago'
      },
      {
        id: '4',
        name: 'Michael Johnson',
        age: 27,
        compatibility: 91,
        interests: 'Sports, Cooking, Photography',
        avatarUrl: 'https://i.pravatar.cc/300?u=michael-johnson',
        lastActive: '1 day ago'
      },
      {
        id: '5',
        name: 'Sophia Garcia',
        age: 25,
        compatibility: 89,
        interests: 'Yoga, Reading, Dancing',
        avatarUrl: 'https://i.pravatar.cc/300?u=sophia-garcia',
        lastActive: '2 days ago'
      }
    ];
    
    setMatches(topMatches);
    setLoading(false);
  }, [user]);

  const handleMessage = (id: string) => {
    navigate(`/messages/${id}`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-roomify-purple-light border-t-roomify-purple rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Your Top Matches</h1>
      
      {matches.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start swiping to find your perfect roommate match!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <Card key={match.id} className="w-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <Avatar className="h-20 w-20 rounded-xl">
                    <AvatarImage src={match.avatarUrl} alt={match.name} />
                    <AvatarFallback className="bg-roomify-purple-light text-white">
                      {match.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg text-roomify-purple">{match.name}</h3>
                          <span className="text-gray-400 ml-2">{match.age}</span>
                        </div>
                        
                        <div className="flex mt-1 mb-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {match.compatibility}% Match
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Interests: {match.interests}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {match.lastActive}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button 
                        className="bg-roomify-primary hover:bg-roomify-purple-dark flex items-center"
                        onClick={() => handleMessage(match.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
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
