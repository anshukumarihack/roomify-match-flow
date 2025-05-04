
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Badge, MessageCircle, Settings, Heart } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const NavBar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { icon: <Home className="w-6 h-6" />, path: '/dashboard', label: 'Home' },
    { icon: <Users className="w-6 h-6" />, path: '/swipe', label: 'Match' },
    { icon: <Heart className="w-6 h-6" />, path: '/matches', label: 'Matches' },
    { icon: <Badge className="w-6 h-6" />, path: '/badges', label: 'Badges' },
    { icon: <MessageCircle className="w-6 h-6" />, path: '/messages', label: 'Messages' },
    { icon: <Settings className="w-6 h-6" />, path: '/settings', label: 'Settings' },
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between z-50 overflow-x-auto shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full flex items-center justify-between overflow-x-auto py-2 px-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-300",
              "text-gray-500 dark:text-gray-400 relative",
              isActive 
                ? "text-roomify-purple bg-roomify-purple/10 dark:text-roomify-primary dark:bg-roomify-primary/20" 
                : "hover:text-roomify-purple-light hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center justify-center relative">
                  {React.cloneElement(item.icon, {
                    className: cn(
                      "w-6 h-6 transition-all duration-300",
                      isActive ? "text-roomify-purple scale-110" : ""
                    )
                  })}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 w-1.5 h-1.5 bg-roomify-purple rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1 whitespace-nowrap font-medium transition-all duration-300",
                  isActive ? "text-roomify-purple" : ""
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default NavBar;
