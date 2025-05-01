
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Mic } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'match';
  content: string;
  timestamp: Date;
}

// Mock user data
const mockMatchData = {
  '1': {
    id: '1',
    name: 'Emma Wilson',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&1',
    messages: [
      { id: '1', sender: 'match', content: 'Hi there! I saw your profile and I think we might be a good match for roommates.', timestamp: new Date(Date.now() - 86400000) },
      { id: '2', sender: 'user', content: 'Hey Emma! Thanks for reaching out. I'm looking for someone who is clean and respectful.', timestamp: new Date(Date.now() - 82800000) },
      { id: '3', sender: 'match', content: 'That's exactly what I'm looking for too! I'm very tidy and quiet when needed.', timestamp: new Date(Date.now() - 79200000) },
      { id: '4', sender: 'user', content: 'Great! What part of town are you looking to live in?', timestamp: new Date(Date.now() - 75600000) },
      { id: '5', sender: 'match', content: 'I'm looking at downtown or the university area. My budget is around $800/month for my share.', timestamp: new Date(Date.now() - 72000000) }
    ]
  },
  '2': {
    id: '2',
    name: 'James Rodriguez',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&man&2',
    messages: [
      { id: '1', sender: 'match', content: 'Hello! I think we'd make good roommates based on our profiles.', timestamp: new Date(Date.now() - 43200000) },
      { id: '2', sender: 'user', content: 'Hi James, thanks for reaching out! What are your hobbies?', timestamp: new Date(Date.now() - 39600000) },
      { id: '3', sender: 'match', content: 'I love coding, watching movies, and hiking on weekends. How about you?', timestamp: new Date(Date.now() - 36000000) }
    ]
  },
  '3': {
    id: '3',
    name: 'Sarah Chen',
    photoUrl: 'https://source.unsplash.com/random/200x200?portrait&woman&3',
    messages: [
      { id: '1', sender: 'match', content: 'Hey! Just matched with you and thought I'd say hi!', timestamp: new Date(Date.now() - 1800000) }
    ]
  }
} as Record<string, {
  id: string;
  name: string;
  photoUrl: string;
  messages: Message[];
}>;

const MessageInterface: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [matchData, setMatchData] = useState({ name: '', photoUrl: '' });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages for the selected match
  useEffect(() => {
    if (matchId && mockMatchData[matchId]) {
      setMessages(mockMatchData[matchId].messages);
      setMatchData({
        name: mockMatchData[matchId].name,
        photoUrl: mockMatchData[matchId].photoUrl
      });
    } else {
      navigate('/matches');
    }
  }, [matchId, navigate]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responses = [
        "That sounds great!",
        "I'd be interested in learning more about that.",
        "Let's definitely discuss this further.",
        "When would be a good time to meet up and discuss housing options?",
        "What other qualities are you looking for in a roommate?",
        "Do you have any specific apartment complexes in mind?"
      ];
      
      const responseMessage: Message = {
        id: `resp-${Date.now()}`,
        sender: 'match',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    const isYesterday = date.getDate() === yesterday.getDate() && 
                        date.getMonth() === yesterday.getMonth() && 
                        date.getFullYear() === yesterday.getFullYear();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
             ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" className="mr-2" onClick={() => navigate('/messages')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <img 
            src={matchData.photoUrl} 
            alt={matchData.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-semibold">{matchData.name}</h2>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message, index) => {
          const isUser = message.sender === 'user';
          const showTimestamp = index === 0 || 
            (messages[index - 1].timestamp.getTime() - message.timestamp.getTime() > 5 * 60 * 1000);
          
          return (
            <div key={message.id}>
              {showTimestamp && (
                <div className="text-center my-2">
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    isUser 
                      ? 'bg-roomify-primary text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t bg-white dark:bg-gray-900">
        <Button 
          type="button"
          variant="ghost" 
          size="icon"
          className="text-gray-500"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mx-2 focus-visible:ring-roomify-purple"
        />
        <Button 
          type="button"
          variant="ghost" 
          size="icon"
          className="text-gray-500 mr-2"
        >
          <Mic className="h-5 w-5" />
        </Button>
        <Button 
          type="submit" 
          size="icon"
          className="bg-roomify-primary hover:bg-roomify-purple-dark rounded-full p-2"
          disabled={!messageText.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInterface;
