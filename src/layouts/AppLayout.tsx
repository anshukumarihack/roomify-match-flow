
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '@/components/common/NavBar';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with back button and logout */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40 px-4 py-2 flex justify-between items-center">
        <Button 
          variant="ghost" 
          className="p-2 rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-bold text-roomify-purple">Roomify</h1>
        
        <Button 
          variant="ghost" 
          className="p-2 rounded-full text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>
      
      <main className="pt-14 pb-24">
        <Outlet />
      </main>
      
      <NavBar />
    </div>
  );
};

export default AppLayout;
