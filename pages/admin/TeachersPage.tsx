import React from 'react';
import { mockTeachers } from '../../services/mockData';

const TeachersPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-dark mb-4">Manage Teachers</h2>
       <div className="overflow-x-auto">
          <table className="w-full text-left">
              <thead>
                  <tr className="bg-gray-50">
                      <th className="p-3">Name</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Students Assigned</th>
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
                          <td className="p-3">15</td>
                          <td className="p-3">
                              <button className="text-primary hover:underline mr-4">View Details</button>
                              <button className="text-secondary hover:underline">Edit</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default TeachersPage;
