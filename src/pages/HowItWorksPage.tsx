
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, MessageCircle, CheckCircle, User, UserPlus, Home } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: <User className="h-10 w-10 text-roomify-purple" />,
      title: "Create Your Profile",
      description: "Start by creating your profile and specifying your preferences, lifestyle, and what you're looking for in a roommate."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-yellow-500" />,
      title: "Discover Matches",
      description: "Our smart matching algorithm will find potential roommates that match your lifestyle and preferences."
    },
    {
      icon: <Heart className="h-10 w-10 text-pink-500" />,
      title: "Swipe Right",
      description: "Like profiles that interest you. If they like yours too, it's a match!"
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-blue-500" />,
      title: "Start Chatting",
      description: "Connect with your matches through our messaging system to see if you're a good fit."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-green-500" />,
      title: "Meet Up Safely",
      description: "Arrange to meet your potential roommate in a public place to further discuss your living arrangement."
    },
    {
      icon: <Home className="h-10 w-10 text-orange-500" />,
      title: "Find Your New Home",
      description: "Move in with your ideal roommate or welcome them to your place."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-roomify-purple mb-4">How Roomify Works</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Roomify makes finding the perfect roommate easy, safe, and fun through our simple process.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-roomify-purple-light hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-6 md:items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex justify-center">
                  <Card className={`relative shadow-lg w-full max-w-sm border-t-4 ${
                    index % 3 === 0 ? 'border-roomify-purple' : 
                    index % 3 === 1 ? 'border-roomify-green' : 'border-roomify-pink-light'
                  }`}>
                    <CardContent className="pt-6 pb-4 px-6">
                      <div className="absolute -top-6 left-6 rounded-full p-3 bg-white shadow-md">
                        {step.icon}
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-roomify-purple-light flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Roommate?</h2>
        <div className="inline-block rounded-full bg-gradient-to-r from-roomify-purple to-roomify-pink p-[4px]">
          <div className="flex justify-center items-center gap-2 bg-white dark:bg-gray-900 rounded-full px-6 py-3">
            <UserPlus className="h-5 w-5 text-roomify-purple" />
            <span className="font-medium bg-gradient-to-r from-roomify-purple to-roomify-pink-light bg-clip-text text-transparent">
              Join Roomify Today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
