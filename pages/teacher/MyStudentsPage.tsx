import React, { useState } from 'react';
import { mockStudents } from '../../services/mockData';
import { Student, User, RiskLevel } from '../../types';
import RiskBadge from '../../components/common/RiskBadge';
import StudentDetailView from './StudentDetailView';

interface MyStudentsPageProps {
  user: User;
}

const MyStudentsPage: React.FC<MyStudentsPageProps> = ({ user }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const teacherStudents = mockStudents.filter(s => s.teacherIds.includes(user.id));
  const highRiskStudents = teacherStudents.filter(s => s.riskLevel === RiskLevel.HIGH);

  if (selectedStudent) {
    return <StudentDetailView student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-dark">My Students</h2>
        <p className="text-secondary mt-1">You have {teacherStudents.length} students. {highRiskStudents.length} are at high risk.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-dark">High-Risk Students</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-red-50">
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Class</th>
                  <th className="p-4 font-semibold">Engagement</th>
                  <th className="p-4 font-semibold">Risk Level</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {highRiskStudents.map(student => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
                      <span className="font-medium">{student.name}</span>
                    </td>
                    <td className="p-4 text-secondary">{student.class}</td>
                    <td className="p-4 text-secondary">{student.engagement}%</td>
                    <td className="p-4"><RiskBadge level={student.riskLevel} /></td>
                    <td className="p-4">
                      <button onClick={() => setSelectedStudent(student)} className="text-primary font-semibold hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      
       <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-dark">All Students</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Class</th>
                  <th className="p-4 font-semibold">Engagement</th>
                  <th className="p-4 font-semibold">Risk Level</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherStudents.sort((a,b) => a.name.localeCompare(b.name)).map(student => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
                      <span className="font-medium">{student.name}</span>
                    </td>
                    <td className="p-4 text-secondary">{student.class}</td>
                    <td className="p-4 text-secondary">{student.engagement}%</td>
                    <td className="p-4"><RiskBadge level={student.riskLevel} /></td>
                    <td className="p-4">
                      <button onClick={() => setSelectedStudent(student)} className="text-primary font-semibold hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default MyStudentsPage;
