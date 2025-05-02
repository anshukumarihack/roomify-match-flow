
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    avatar: "https://source.unsplash.com/random/100x100?woman&1",
    rating: 5,
    content: "I found my perfect roommate in just two weeks! The matching algorithm is spot on and the interface makes it so easy to connect.",
    date: "April 10, 2025"
  },
  {
    id: 2,
    name: "Jason K.",
    avatar: "https://source.unsplash.com/random/100x100?man&1",
    rating: 4,
    content: "After trying several other apps without success, I found my ideal match here within days. The personality matching really works!",
    date: "March 25, 2025"
  },
  {
    id: 3,
    name: "Emily R.",
    avatar: "https://source.unsplash.com/random/100x100?woman&2",
    rating: 5,
    content: "The gamification aspect makes finding a roommate actually fun! I've earned so many badges and the experience is very engaging.",
    date: "April 2, 2025"
  },
  {
    id: 4,
    name: "Michael T.",
    avatar: "https://source.unsplash.com/random/100x100?man&2",
    rating: 5,
    content: "I was nervous about finding someone compatible, but the detailed preferences really helped me find someone who fits my lifestyle.",
    date: "March 18, 2025"
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-roomify-purple">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(review => (
            <Card key={review.id} className="card-hover-effect border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-roomify-purple-light">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback className="bg-roomify-purple-light text-white">
                      {review.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
