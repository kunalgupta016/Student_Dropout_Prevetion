import React from 'react';
import DashboardPage from './DashboardPage';
import TeachersPage from './TeachersPage';
import StudentsPage from './StudentsPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';

interface AdminDashboardProps {
  activePage?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activePage }) => {
  switch (activePage) {
    case 'Teachers':
      return <TeachersPage />;
    case 'Students':
      return <StudentsPage />;
    case 'Analytics':
      return <AnalyticsPage />;
    case 'Settings':
      return <SettingsPage />;
    case 'Dashboard':
    default:
      return <DashboardPage />;
  }
};

export default AdminDashboard;
