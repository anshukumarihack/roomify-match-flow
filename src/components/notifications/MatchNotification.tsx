
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, MessageCircle } from 'lucide-react';

export interface MatchNotificationProps {
  matchName: string;
  matchAvatar?: string;
  onClose: () => void;
  onMessage: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({
  matchName,
  matchAvatar,
  onClose,
  onMessage
}) => {
  return (
    <div className="fixed top-24 right-4 z-50 w-80 transform transition-all duration-500 animate-slide-in-right">
      <Card className="overflow-hidden border-2 border-roomify-purple shadow-lg bg-gradient-to-r from-roomify-purple-light to-white dark:from-roomify-purple dark:to-gray-800">
        <CardContent className="p-0">
          <div className="bg-roomify-purple p-3 flex justify-between items-center">
            <h3 className="text-white font-semibold">New Match! 🎉</h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-white hover:bg-roomify-purple-dark">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-16 w-16 border-2 border-roomify-purple">
                <AvatarImage src={matchAvatar} alt={matchName} />
                <AvatarFallback className="bg-roomify-purple text-white">
                  {matchName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">You matched with</p>
                <h4 className="text-lg font-bold text-roomify-purple">{matchName}!</h4>
              </div>
            </div>
            <Button 
              onClick={onMessage} 
              className="w-full bg-roomify-primary hover:bg-roomify-purple-dark flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchNotification;
