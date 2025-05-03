
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from '@/components/home/HeroSection';
import DashboardOverview from '@/components/home/DashboardOverview';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/common/Footer';

// Generate mock user data
const generateMockMatches = (count: number) => {
  const personalities = ['Introvert', 'Extrovert', 'Ambivert'];
  const sleepTimes = ['Early bird', 'Night owl', 'Flexible'];
  const cleanlinessLevels = ['Very neat', 'Average', 'Relaxed'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `match-${i + 1}`,
    name: `User ${i + 1}`,
    personality: personalities[Math.floor(Math.random() * personalities.length)],
    sleep_time: sleepTimes[Math.floor(Math.random() * sleepTimes.length)],
    cleanliness: cleanlinessLevels[Math.floor(Math.random() * cleanlinessLevels.length)],
    compatibility: Math.floor(Math.random() * 30) + 70, // 70-100% compatibility
    work_schedule: Math.random() > 0.5 ? 'Standard 9-5' : 'Flexible',
    food: Math.random() > 0.7 ? 'Vegetarian' : 'No restrictions',
    interests: Math.random() > 0.5 ? 'Gaming, Movies' : 'Hiking, Reading',
    lastActive: ['Just now', '5 min ago', '1 hour ago'][Math.floor(Math.random() * 3)],
    messageCount: Math.floor(Math.random() * 10)
  }));
};

const Index = () => {
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('is_logged_in') === 'true' || false);
  
  // Stats for dashboard
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalMessagesReceived: 0,
    activityStreak: 5,
    profileCompleteness: 85,
    level: 2,
    xp: 230,
    xpToNextLevel: 500,
  });
  
  // Add floating animation to icons
  useEffect(() => {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      const delay = index * 0.5;
      const element = icon as HTMLElement;
      element.style.animationDelay = `${delay}s`;
    });
    
    // Fetch recent matches or generate mock data
    const fetchRecentMatches = async () => {
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .limit(25);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setRecentMatches(data);
          setStats(prev => ({
            ...prev,
            totalMatches: data.length,
            totalMessagesReceived: Math.floor(Math.random() * 50) + 10
          }));
        } else {
          // Generate mock data if no real data
          const mockData = generateMockMatches(25);
          setRecentMatches(mockData);
          setStats(prev => ({
            ...prev,
            totalMatches: mockData.length,
            totalMessagesReceived: Math.floor(Math.random() * 50) + 10
          }));
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        // Fallback to mock data
        const mockData = generateMockMatches(25);
        setRecentMatches(mockData);
        setStats(prev => ({
          ...prev,
          totalMatches: mockData.length,
          totalMessagesReceived: Math.floor(Math.random() * 50) + 10
        }));
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentMatches();
    
    // For demo purposes, set logged in state
    localStorage.setItem('is_logged_in', 'true');
    setIsLoggedIn(true);
    
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section for logged out users */}
      <HeroSection isLoggedIn={isLoggedIn} />
      
      {/* Dashboard for logged in users */}
      <DashboardOverview 
        isLoggedIn={isLoggedIn}
        stats={stats}
        recentMatches={recentMatches.slice(0, 4)}
        loading={loading}
      />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
