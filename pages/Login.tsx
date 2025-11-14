
import React from 'react';
import { Role } from '../types';
import { mockUsers } from '../services/mockData';

interface LoginProps {
  onLogin: (role: Role) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const roles = [Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.PARENT];

  const getRoleInfo = (role: Role) => {
    const user = mockUsers.find(u => u.role === role);
    return {
      name: user?.name || role,
      avatar: user?.avatar || 'https://picsum.photos/100',
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-2">Student Dropout Prevention System</h1>
            <p className="text-lg text-secondary">Please select your role to proceed.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const { name, avatar } = getRoleInfo(role);
            return (
              <div
                key={role}
                onClick={() => onLogin(role)}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <img src={avatar} alt={name} className="w-24 h-24 rounded-full mb-4 border-4 border-primary/50" />
                <h2 className="text-xl font-semibold text-dark capitalize">{role}</h2>
                <p className="text-secondary text-sm">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
       <footer className="text-center mt-12 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dropout Prevention Initiative. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Login;
