
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

interface Conversation {
  id: string;
  name: string;
  photoUrl: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatarUrl?: string;
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Since we're showing only top 5 matches now
        const mockMatches = [
          {
            id: '1',
            name: 'Emma Wilson',
            compatibility: 98,
            lastMessage: "I'm looking at downtown or the university area. My budget is around $800/month for my share.",
            timestamp: new Date(Date.now() - 72000000),
            unreadCount: 2,
            avatarUrl: 'https://i.pravatar.cc/300?u=emma-wilson'
          },
          {
            id: '2',
            name: 'James Rodriguez',
            compatibility: 95,
            lastMessage: "I love coding, watching movies, and hiking on weekends. How about you?",
            timestamp: new Date(Date.now() - 36000000),
            unreadCount: 0,
            avatarUrl: 'https://i.pravatar.cc/300?u=james-rodriguez'
          },
          {
            id: '3',
            name: 'Sarah Chen',
            compatibility: 92,
            lastMessage: "Hey! Just matched with you and thought I'd say hi!",
            timestamp: new Date(Date.now() - 1800000),
            unreadCount: 1,
            avatarUrl: 'https://i.pravatar.cc/300?u=sarah-chen'
          },
          {
            id: '4',
            name: 'Michael Johnson',
            compatibility: 91,
            lastMessage: "What areas of the city are you interested in?",
            timestamp: new Date(Date.now() - 86400000),
            unreadCount: 0,
            avatarUrl: 'https://i.pravatar.cc/300?u=michael-johnson'
          },
          {
            id: '5',
            name: 'Sophia Garcia',
            compatibility: 89,
            lastMessage: "I'm also looking for a place with good public transportation access.",
            timestamp: new Date(Date.now() - 150000000),
            unreadCount: 3,
            avatarUrl: 'https://i.pravatar.cc/300?u=sophia-garcia'
          }
        ];
        
        // Convert to conversations format
        const mappedConversations: Conversation[] = mockMatches.map(match => ({
          id: match.id,
          name: match.name,
          photoUrl: match.avatarUrl,
          lastMessage: match.lastMessage,
          timestamp: match.timestamp,
          unreadCount: match.unreadCount,
          avatarUrl: match.avatarUrl
        }));
        
        setConversations(mappedConversations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, [user]);
  
  const filteredConversations = conversations.filter(convo =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-roomify-purple">Messages</h1>
      
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search conversations..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-roomify-purple-light border-t-roomify-purple rounded-full animate-spin"></div>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No conversations</h2>
          <p className="text-gray-600">
            {searchTerm ? 'No results found for your search' : 'Match with people to start chatting!'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredConversations.map(conversation => (
            <Link to={`/messages/${conversation.id}`} key={conversation.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar className="h-14 w-14">
                        <AvatarImage 
                          src={conversation.avatarUrl} 
                          alt={conversation.name} 
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-roomify-purple-light text-white">
                          {conversation.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-roomify-purple">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                      
                      <p className={`text-sm ${
                        conversation.unreadCount > 0 
                          ? 'text-black dark:text-white font-medium' 
                          : 'text-gray-600 dark:text-gray-400'
                      } truncate`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
