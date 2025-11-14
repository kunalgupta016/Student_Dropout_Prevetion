import React from 'react';
import { User } from '../../types';
import MyStudentsPage from './MyStudentsPage';
import ReportsPage from './ReportsPage';
import MessagesPage from './MessagesPage';

interface TeacherDashboardProps {
  user: User;
  activePage?: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, activePage }) => {
  // A simple dashboard page for the 'Dashboard' link
  const DashboardPage = () => (
     <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-dark">Welcome, {user.name}</h2>
        <p className="text-secondary mt-1">Select a page from the sidebar to get started.</p>
      </div>
  )

  switch (activePage) {
    case 'My Students':
      return <MyStudentsPage user={user} />;
    case 'Reports':
      return <ReportsPage />;
    case 'Messages':
      return <MessagesPage />;
    case 'Dashboard':
    default:
      return <DashboardPage />;
  }
};

export default TeacherDashboard;
