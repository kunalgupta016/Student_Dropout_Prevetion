import React, { useState } from 'react';
import { User } from '../../types';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        user={user} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {React.cloneElement(children as React.ReactElement, { activePage })}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
