
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-roomify-purple">
          Ready to Find Your Perfect Roommate?
        </h2>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          Join thousands of users who have already found their ideal living situations through Roomify.
        </p>
        <Button
          size="lg"
          className="bg-roomify-primary hover:bg-roomify-purple-dark"
          onClick={() => navigate('/signup')}
        >
          Create Your Account
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
