
import React from 'react';
import { Star, BadgeIcon, Flame } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-roomify-purple">
          Find Roommates That Match Your Lifestyle
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-roomify-purple/10 w-fit mb-4">
              <Star className="h-8 w-8 text-roomify-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our algorithm matches you with roommates based on lifestyle, habits, and preferences.
            </p>
          </div>
          
          <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 w-fit mb-4">
              <BadgeIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gain XP, level up, and unlock badges as you use the app and find great matches.
            </p>
          </div>
          
          <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 w-fit mb-4">
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Streaks</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build your streak by logging in daily for special rewards and bonuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
