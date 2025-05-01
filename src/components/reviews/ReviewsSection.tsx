
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Jessica K.',
    avatar: 'https://source.unsplash.com/random/200x200?woman&1',
    rating: 5,
    text: 'I found my perfect roommate in just three days! The compatibility matching really works and made the process so much easier than other platforms I tried.',
    date: 'January 15, 2025'
  },
  {
    id: '2',
    name: 'Michael T.',
    avatar: 'https://source.unsplash.com/random/200x200?man&2',
    rating: 4,
    text: 'As a busy professional, I didn\'t have time to sort through endless listings. Roomify matched me with someone who has the same work schedule and cleanliness standards.',
    date: 'February 3, 2025'
  },
  {
    id: '3',
    name: 'Sarah L.',
    avatar: 'https://source.unsplash.com/random/200x200?woman&3',
    rating: 5,
    text: 'After a nightmare roommate experience, I was hesitant to try again. Roomify\'s detailed profiles and preference matching helped me find someone I actually get along with!',
    date: 'March 22, 2025'
  },
  {
    id: '4',
    name: 'David R.',
    avatar: 'https://source.unsplash.com/random/200x200?man&4',
    rating: 5,
    text: 'The messaging feature made it easy to communicate before meeting in person. Fantastic platform that actually delivers on its promises.',
    date: 'April 10, 2025'
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-roomify-purple mb-2">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it - see what people who have found their perfect roommate match have to say.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback className="bg-roomify-purple-light text-white">
                      {review.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm italic">"{review.text}"</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
