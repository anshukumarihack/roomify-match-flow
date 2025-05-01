
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/common/NavBar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="pb-16">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default AppLayout;
