
import React from 'react';
import { Link } from 'react-router-dom';
import HowItWorksPage from './HowItWorksPage';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import ContactFeedbackSection from '@/components/contact/ContactFeedbackSection';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const AboutPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {!isAuthenticated && (
        <motion.div 
          className="bg-gradient-to-br from-roomify-purple to-blue-500 text-white py-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Find Your Perfect Roommate Match
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join Roomify and discover compatible roommates based on your lifestyle, preferences, and personality.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-roomify-purple hover:bg-gray-100 text-lg py-6 px-8"
                asChild
              >
                <Link to="/signup">Get Started</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 text-lg py-6 px-8"
                asChild
              >
                <Link to="/login">I Already Have an Account</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      <HowItWorksPage />
      <ReviewsSection />
      <ContactFeedbackSection />
    </div>
  );
};

export default AboutPage;
