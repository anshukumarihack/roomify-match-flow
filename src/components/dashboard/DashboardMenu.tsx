
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, Users, MessageCircle, Heart, Award, Bell, 
  Settings, HelpCircle, Info, UserCircle, Activity
} from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  color: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path, color }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105`}
      onClick={() => navigate(path)}
    >
      <div className={`p-3 rounded-full ${color} mb-2`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const DashboardMenu: React.FC = () => {
  const menuItems = [
    { 
      icon: <Home className="h-6 w-6 text-roomify-purple" />, 
      label: 'Dashboard', 
      path: '/dashboard', 
      color: 'bg-roomify-purple/10' 
    },
    { 
      icon: <Users className="h-6 w-6 text-blue-500" />, 
      label: 'Match', 
      path: '/swipe', 
      color: 'bg-blue-100 dark:bg-blue-900/20' 
    },
    { 
      icon: <Heart className="h-6 w-6 text-red-500" />, 
      label: 'Matches', 
      path: '/matches', 
      color: 'bg-red-100 dark:bg-red-900/20' 
    },
    { 
      icon: <MessageCircle className="h-6 w-6 text-green-500" />, 
      label: 'Messages', 
      path: '/messages', 
      color: 'bg-green-100 dark:bg-green-900/20' 
    },
    { 
      icon: <Award className="h-6 w-6 text-yellow-500" />, 
      label: 'Badges', 
      path: '/badges', 
      color: 'bg-yellow-100 dark:bg-yellow-900/20' 
    },
    { 
      icon: <Activity className="h-6 w-6 text-orange-500" />, 
      label: 'Activity', 
      path: '/activity', 
      color: 'bg-orange-100 dark:bg-orange-900/20' 
    },
    { 
      icon: <UserCircle className="h-6 w-6 text-indigo-500" />, 
      label: 'Profile', 
      path: '/create-profile', 
      color: 'bg-indigo-100 dark:bg-indigo-900/20' 
    },
    { 
      icon: <Settings className="h-6 w-6 text-gray-500" />, 
      label: 'Settings', 
      path: '/settings', 
      color: 'bg-gray-100 dark:bg-gray-800' 
    },
    { 
      icon: <Info className="h-6 w-6 text-cyan-500" />, 
      label: 'About', 
      path: '/about', 
      color: 'bg-cyan-100 dark:bg-cyan-900/20' 
    },
    { 
      icon: <HelpCircle className="h-6 w-6 text-violet-500" />, 
      label: 'How It Works', 
      path: '/how-it-works', 
      color: 'bg-violet-100 dark:bg-violet-900/20' 
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-roomify-purple">Navigation</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              color={item.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMenu;
