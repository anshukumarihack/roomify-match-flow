
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { House, Star, Calendar, Badge, MessageCircle } from "lucide-react";
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <House className="w-6 h-6" />, path: '/dashboard', label: 'Home' },
    { icon: <Star className="w-6 h-6" />, path: '/swipe', label: 'Match' },
    { icon: <Badge className="w-6 h-6" />, path: '/badges', label: 'Badges' },
    { icon: <Calendar className="w-6 h-6" />, path: '/activity', label: 'Activity' },
    { icon: <MessageCircle className="w-6 h-6" />, path: '/messages', label: 'Messages' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around px-4 z-50">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center",
            "text-gray-500 dark:text-gray-400 transition-colors",
            isActive ? "text-roomify-primary dark:text-roomify-primary" : "hover:text-roomify-purple-light"
          )}
        >
          <div className="flex items-center justify-center">
            {item.icon}
          </div>
          <span className="text-xs mt-1">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
