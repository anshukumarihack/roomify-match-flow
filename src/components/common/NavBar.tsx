
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Badge, MessageCircle, User, Settings, Heart, Activity } from "lucide-react";
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home className="w-6 h-6" />, path: '/dashboard', label: 'Home' },
    { icon: <Users className="w-6 h-6" />, path: '/swipe', label: 'Match' },
    { icon: <Heart className="w-6 h-6" />, path: '/matches', label: 'Matches' },
    { icon: <Badge className="w-6 h-6" />, path: '/badges', label: 'Badges' },
    { icon: <Activity className="w-6 h-6" />, path: '/activity', label: 'Activity' },
    { icon: <MessageCircle className="w-6 h-6" />, path: '/messages', label: 'Messages' },
    { icon: <User className="w-6 h-6" />, path: '/create-profile', label: 'Profile' },
    { icon: <Settings className="w-6 h-6" />, path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50 overflow-x-auto">
      <div className="w-full flex items-center justify-between overflow-x-auto py-1 px-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200",
              "text-gray-500 dark:text-gray-400",
              isActive 
                ? "text-roomify-purple bg-roomify-purple/10 dark:text-roomify-primary dark:bg-roomify-primary/20" 
                : "hover:text-roomify-purple-light hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-xs mt-1 whitespace-nowrap">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
