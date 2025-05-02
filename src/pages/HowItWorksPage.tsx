
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Star, Users, X } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Set up your profile with photos and your preferences for an ideal roommate or partner.",
      icon: <Users className="h-10 w-10 text-roomify-purple" />
    },
    {
      title: "Start Swiping",
      description: "Browse profiles and swipe right on people you're interested in connecting with, or left to pass.",
      icon: <X className="h-10 w-10 text-red-500" />
    },
    {
      title: "Match & Connect",
      description: "When someone also swipes right on you, it's a match! Connect and chat to learn more about each other.",
      icon: <Heart className="h-10 w-10 text-green-500" />
    },
    {
      title: "Message Your Matches",
      description: "Start a conversation with your matches to discuss potential compatibility and next steps.",
      icon: <MessageCircle className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Earn Rewards",
      description: "Gain XP and earn badges as you use the app and interact with potential matches.",
      icon: <Star className="h-10 w-10 text-yellow-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-roomify-purple">How Roomify Works</h1>
      
      <div className="text-center mb-10">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Finding your perfect roommate or partner has never been easier. 
          Follow these simple steps to get started on your journey.
        </p>
      </div>
      
      <div className="space-y-12 mt-16">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index !== steps.length - 1 && (
              <div className="absolute left-10 top-20 h-24 w-0.5 bg-gradient-to-b from-roomify-purple to-transparent" />
            )}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-roomify-purple/10 flex items-center justify-center animate-pulse-shadow">
                {step.icon}
              </div>
              <Card className={`w-full md:w-auto flex-grow card-hover-effect ${index % 2 === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-white to-purple-50 dark:from-gray-800 dark:to-gray-700`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-roomify-purple">Step {index + 1}: {step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-roomify-purple">Ready to Get Started?</h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Join our community today and find your perfect match!
        </p>
        <div className="bg-roomify-purple text-white rounded-lg px-6 py-3 inline-block font-medium hover:bg-roomify-purple-dark transition-colors cursor-pointer">
          Start Matching Now
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
