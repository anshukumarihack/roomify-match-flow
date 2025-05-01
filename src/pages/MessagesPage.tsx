
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  photoUrl: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&1',
    lastMessage: "I'm looking at downtown or the university area. My budget is around $800/month for my share.",
    timestamp: new Date(Date.now() - 72000000),
    unreadCount: 2
  },
  {
    id: '2',
    name: 'James Rodriguez',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&man&2',
    lastMessage: "I love coding, watching movies, and hiking on weekends. How about you?",
    timestamp: new Date(Date.now() - 36000000),
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Sarah Chen',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&3',
    lastMessage: "Hey! Just matched with you and thought I'd say hi!",
    timestamp: new Date(Date.now() - 1800000),
    unreadCount: 1
  }
];

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [searchTerm, setSearchTerm] = useState('');
  
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
      
      {filteredConversations.length === 0 ? (
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
                      <img 
                        src={conversation.photoUrl} 
                        alt={conversation.name} 
                        className="h-14 w-14 rounded-full object-cover"
                      />
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
