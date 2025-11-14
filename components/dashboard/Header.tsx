
import React from 'react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-700 ml-4">Welcome, {user.name}</h1>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button onClick={onLogout} className="flex items-center text-sm font-medium text-gray-500 hover:text-primary focus:outline-none">
            <img className="h-8 w-8 rounded-full object-cover mr-2" src={user.avatar} alt="User avatar" />
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
