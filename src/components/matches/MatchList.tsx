
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Match {
  id: string;
  name: string;
  photoUrl: string;
  lastActive: string;
  compatibility: number;
  hasUnreadMessages: boolean;
  matchDate: string;
}

const initialMatches: Match[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&1',
    lastActive: '2 min ago',
    compatibility: 95,
    hasUnreadMessages: true,
    matchDate: '2 days ago'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&man&2',
    lastActive: '1 hour ago',
    compatibility: 85,
    hasUnreadMessages: false,
    matchDate: '1 day ago'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&3',
    lastActive: '3 hours ago',
    compatibility: 78,
    hasUnreadMessages: true,
    matchDate: 'Just now'
  }
];

const MatchList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const navigate = useNavigate();

  const handleMessageClick = (matchId: string) => {
    navigate(`/messages/${matchId}`);
  };

  const handleProfileClick = (matchId: string) => {
    navigate(`/profile/${matchId}`);
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Your Matches</h1>
      
      {matches.length === 0 ? (
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
                    <img 
                      src={match.photoUrl} 
                      alt={match.name} 
                      className="h-24 w-24 object-cover cursor-pointer"
                      onClick={() => handleProfileClick(match.id)}
                    />
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
