
import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import NavBar from '@/components/common/NavBar';
import { ArrowLeft, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleLogout = () => {
    logout();
  };

  // Get current page name from URL
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with back button and logout */}
      <motion.header 
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40 px-4 py-2 flex justify-between items-center shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="ghost" 
          className="p-2 rounded-full hover:bg-roomify-purple/10 transition-colors"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-roomify-purple to-blue-500">
          {getPageTitle()}
        </h1>
        
        <div className="flex items-center space-x-2">
          {user && (
            <Link to="/settings" className="flex items-center">
              <Avatar className="h-8 w-8 border-2 border-roomify-purple/30 hover:border-roomify-purple transition-colors">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </motion.header>
      
      <main className="pt-14 pb-24">
        <Outlet />
      </main>
      
      <NavBar />
    </div>
  );
};

export default AppLayout;
