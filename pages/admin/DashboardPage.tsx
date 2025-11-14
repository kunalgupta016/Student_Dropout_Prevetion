import React from 'react';
import { mockStudents, mockTeachers } from '../../services/mockData';
import { RiskLevel } from '../../types';
import StatCard from '../../components/common/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const DashboardPage: React.FC = () => {
  const totalStudents = mockStudents.length;
  const highRiskStudents = mockStudents.filter(s => s.riskLevel === RiskLevel.HIGH).length;
  const moderateRiskStudents = mockStudents.filter(s => s.riskLevel === RiskLevel.MODERATE).length;
  const totalTeachers = mockTeachers.length;

  const riskData = [
    { name: 'Low Risk', value: totalStudents - highRiskStudents - moderateRiskStudents, color: '#28A745' },
    { name: 'Moderate Risk', value: moderateRiskStudents, color: '#FFC107' },
    { name: 'High Risk', value: highRiskStudents, color: '#DC3545' },
  ];

  const trendData = [
    { name: 'Jan', dropouts: 4 },
    { name: 'Feb', dropouts: 3 },
    { name: 'Mar', dropouts: 5 },
    { name: 'Apr', dropouts: 4 },
    { name: 'May', dropouts: 6 },
    { name: 'Jun', dropouts: 7 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={totalStudents} icon={<UsersIcon />} color="#007BFF" />
        <StatCard title="High-Risk Students" value={highRiskStudents} icon={<AlertTriangleIcon />} color="#DC3545" />
        <StatCard title="Total Teachers" value={totalTeachers} icon={<BriefcaseIcon />} color="#17A2B8" />
        <StatCard title="Alerts This Week" value="12" icon={<BellIcon />} color="#FFC107" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark mb-4">Dropout Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="dropouts" fill="#007BFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark mb-4">Student Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {riskData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-dark mb-4">Manage Teachers</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3">Name</th>
                            <th className="p-3">Subject</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTeachers.map(teacher => (
                            <tr key={teacher.id} className="border-b">
                                <td className="p-3 flex items-center">
                                    <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-full mr-3" />
                                    {teacher.name}
                                </td>
                                <td className="p-3">{teacher.subject}</td>
                                <td className="p-3">
                                    <button className="text-primary hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-dark mb-4">Recent Student Approvals</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3">Name</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStudents.slice(0, 3).map(student => (
                            <tr key={student.id} className="border-b">
                                <td className="p-3 flex items-center">
                                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                                    {student.name}
                                </td>
                                <td className="p-3">{student.class}</td>
                                <td className="p-3"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

export default DashboardPage;
