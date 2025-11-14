
import React, { useState } from 'react';
import { Student } from '../../types';
import RiskBadge from '../../components/common/RiskBadge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { generateImprovementPlan } from '../../services/geminiService';

interface StudentDetailViewProps {
  student: Student;
  onBack: () => void;
}

const StudentDetailView: React.FC<StudentDetailViewProps> = ({ student, onBack }) => {
  const [improvementPlan, setImprovementPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const attendanceData = student.attendance.map(a => ({
    date: a.date.slice(5),
    status: a.status === 'Present' ? 1 : (a.status === 'Late' ? 0.5 : 0),
  }));

  const performanceData = [
    { subject: 'Mathematics', score: student.marks.find(m => m.subject === 'Mathematics')?.score || 0, fullMark: 100 },
    { subject: 'Science', score: student.marks.find(m => m.subject === 'Science')?.score || 0, fullMark: 100 },
    { subject: 'History', score: student.marks.find(m => m.subject === 'History')?.score || 0, fullMark: 100 },
    { subject: 'Engagement', score: student.engagement, fullMark: 100 },
    { subject: 'Well-being', score: student.wellBeingScore * 10, fullMark: 100 },
  ];

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setImprovementPlan('');
    const plan = await generateImprovementPlan(student);
    setImprovementPlan(plan);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-primary font-semibold hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Student List
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full mr-6 border-4" style={{ borderColor: student.riskLevel === 'High' ? '#DC3545' : student.riskLevel === 'Moderate' ? '#FFC107' : '#28A745' }}/>
          <div>
            <h2 className="text-3xl font-bold text-dark">{student.name}</h2>
            <p className="text-secondary">{student.class} | Age: {student.age}</p>
            <div className="mt-2"><RiskBadge level={student.riskLevel} /></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-dark mb-4">Overall Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={student.name} dataKey="score" stroke="#007BFF" fill="#007BFF" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
         </div>
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-dark mb-4">Recent Attendance</h3>
             <ResponsiveContainer width="100%" height={300}>
               <LineChart data={attendanceData}>
                 <XAxis dataKey="date" />
                 <YAxis domain={[0,1]} ticks={[0, 0.5, 1]} tickFormatter={(val) => val === 1 ? 'Present' : val === 0.5 ? 'Late' : 'Absent'}/>
                 <Tooltip />
                 <Legend />
                 <Line type="monotone" dataKey="status" stroke="#8884d8" />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark mb-4">AI-Generated Improvement Plan</h3>
        <button 
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
        >
          {isLoading ? 'Generating...' : 'Generate Personalized Plan'}
        </button>
        {isLoading && <div className="mt-4 text-center">Analyzing student data...</div>}
        {improvementPlan && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 prose max-w-none">
            <div dangerouslySetInnerHTML={{__html: improvementPlan.replace(/\n/g, '<br />')}}/>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentDetailView;
