
import React from 'react';
import HowItWorksPage from './HowItWorksPage';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import ContactFeedbackSection from '@/components/contact/ContactFeedbackSection';

const AboutPage: React.FC = () => {
  return (
    <div className="pb-20">
      <HowItWorksPage />
      <ReviewsSection />
      <ContactFeedbackSection />
    </div>
  );
};

export default AboutPage;
