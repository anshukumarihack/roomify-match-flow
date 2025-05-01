
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Users, MessageSquare, Check, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Create Your Profile",
      description: "Set up your profile with details about your lifestyle, preferences, and what you're looking for in a roommate.",
      icon: <Users className="w-10 h-10 text-roomify-purple" />,
      color: "bg-purple-50"
    },
    {
      title: "Discover Matches",
      description: "Our algorithm matches you with potential roommates based on compatibility factors like sleep schedules, cleanliness, and lifestyle.",
      icon: <Search className="w-10 h-10 text-roomify-green" />,
      color: "bg-green-50"
    },
    {
      title: "Connect & Chat",
      description: "Once you find someone interesting, connect and chat directly through our platform to discuss living arrangements.",
      icon: <MessageSquare className="w-10 h-10 text-roomify-blue" />,
      color: "bg-blue-50"
    },
    {
      title: "Find Your Match",
      description: "Meet up, discuss details, and decide if you've found your perfect roommate match.",
      icon: <Check className="w-10 h-10 text-roomify-purple-dark" />,
      color: "bg-purple-100"
    }
  ];
  
  return (
    <div className="container mx-auto pb-20 pt-8">
      <h1 className="text-3xl font-bold text-center text-roomify-purple mb-2">How Roomify Works</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Finding the perfect roommate shouldn't be a hassle. Our platform makes it easy to connect with compatible roommates in just a few steps.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className={`${step.color} rounded-t-lg p-4 flex justify-center`}>
              {step.icon}
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-roomify-purple to-roomify-purple-dark rounded-lg p-8 text-white text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Ready to find your perfect roommate?</h2>
        <p className="mb-6 max-w-xl mx-auto">Join thousands of people who have found their ideal living situation through Roomify.</p>
        <Button 
          onClick={() => navigate('/swipe')}
          className="bg-white text-roomify-purple hover:bg-gray-100"
        >
          Get Started <Heart className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-roomify-purple mb-6">Why Choose Roomify?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-roomify-purple-light p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
            <p className="text-gray-600">All user profiles are verified to ensure a safe and reliable experience.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-roomify-purple-light p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">Our advanced algorithm ensures you find truly compatible roommates.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-roomify-purple-light p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Messaging</h3>
            <p className="text-gray-600">Chat safely with potential roommates through our secure messaging system.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorksPage;
