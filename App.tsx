
import React, { useState } from 'react';
import { User, Role } from './types';
import { mockUsers } from './services/mockData';
import Login from './pages/Login';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (role: Role) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case Role.ADMIN:
        return <AdminDashboard />;
      case Role.TEACHER:
        return <TeacherDashboard user={currentUser} />;
      case Role.PARENT:
        return <ParentDashboard user={currentUser} />;
      case Role.STUDENT:
        return <StudentDashboard user={currentUser} />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout user={currentUser} onLogout={handleLogout}>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default App;
