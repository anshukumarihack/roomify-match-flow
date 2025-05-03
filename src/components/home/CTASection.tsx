
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('is_logged_in') === 'true' || false;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-roomify-purple">
          {isLoggedIn ? 'Ready to Find More Roommates?' : 'Ready to Find Your Perfect Roommate?'}
        </h2>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          {isLoggedIn 
            ? 'Discover more compatible roommates and expand your network of potential matches.'
            : 'Join thousands of users who have already found their ideal living situations through Roomify.'}
        </p>
        <Button
          size="lg"
          className="bg-roomify-primary hover:bg-roomify-purple-dark"
          onClick={() => navigate(isLoggedIn ? '/swipe' : '/signup')}
        >
          {isLoggedIn ? 'Find More Matches' : 'Create Your Account'}
        </Button>
        
        {isLoggedIn && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="link"
              className="text-roomify-purple"
              onClick={() => navigate('/matches')}
            >
              View All My Matches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CTASection;
