
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from '@/components/home/HeroSection';
import DashboardOverview from '@/components/home/DashboardOverview';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/common/Footer';

const Index = () => {
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('is_logged_in') || true;
  
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
    
    // Fetch recent matches
    const fetchRecentMatches = async () => {
      try {
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .limit(4);
        
        if (error) throw error;
        
        if (data) {
          setRecentMatches(data);
          setStats(prev => ({
            ...prev,
            totalMatches: data.length
          }));
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentMatches();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section for logged out users */}
      <HeroSection isLoggedIn={!!isLoggedIn} />
      
      {/* Dashboard for logged in users */}
      <DashboardOverview 
        isLoggedIn={!!isLoggedIn}
        stats={stats}
        recentMatches={recentMatches}
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
