import React from 'react';
import { User } from '../../types';
import DashboardPage from './DashboardPage';
import PerformancePage from '../common/PerformancePage';
import AttendancePage from '../common/AttendancePage';
import MessagesPage from '../common/MessagesPage';

interface StudentDashboardProps {
  user: User;
  activePage?: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, activePage }) => {
    switch (activePage) {
    case 'Performance':
      return <PerformancePage />;
    case 'Attendance':
      return <AttendancePage />;
    case 'Messages':
      return <MessagesPage />;
    case 'Dashboard':
    default:
      return <DashboardPage user={user} />;
  }
};

export default StudentDashboard;
