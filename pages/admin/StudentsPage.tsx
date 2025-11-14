import React from 'react';
import { mockStudents, mockTeachers } from '../../services/mockData';
import RiskBadge from '../../components/common/RiskBadge';

const StudentsPage = () => {
  const getTeacherName = (teacherIds: string[]) => {
    const teacher = mockTeachers.find(t => teacherIds.includes(t.id));
    return teacher ? teacher.name : 'N/A';
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-dark mb-4">Manage Students</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Risk Level</th>
              <th className="p-3">Main Teacher</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map(student => (
              <tr key={student.id} className="border-b">
                <td className="p-3 flex items-center">
                  <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                  {student.name}
                </td>
                <td className="p-3">{student.class}</td>
                <td className="p-3"><RiskBadge level={student.riskLevel} /></td>
                <td className="p-3">{getTeacherName(student.teacherIds)}</td>
                <td className="p-3">
                  <button className="text-primary hover:underline mr-4">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
