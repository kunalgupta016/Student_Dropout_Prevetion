import React from 'react';
import { mockStudents } from '../../services/mockData';
import { User, RiskLevel } from '../../types';
import RiskBadge from '../../components/common/RiskBadge';
import StatCard from '../../components/common/StatCard';

interface DashboardPageProps {
  user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const child = mockStudents.find(s => s.parentId === user.id);

  if (!child) {
    return <div className="bg-white p-6 rounded-lg shadow-md">No child data found for this account.</div>;
  }

  const attendancePercentage = (child.attendance.filter(a => a.status === 'Present').length / child.attendance.length) * 100;
  const averageScore = child.marks.reduce((acc, m) => acc + (m.score / m.maxScore), 0) / child.marks.length * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <img src={child.avatar} alt={child.name} className="w-20 h-20 rounded-full mr-6" />
        <div>
            <h2 className="text-3xl font-bold text-dark">{child.name}'s Dashboard</h2>
            <p className="text-secondary">{child.class}</p>
            <div className="mt-2"><RiskBadge level={child.riskLevel} /></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Overall Attendance" value={`${attendancePercentage.toFixed(1)}%`} icon={<CalendarIcon />} color="#28A745" />
        <StatCard title="Average Score" value={`${averageScore.toFixed(1)}%`} icon={<AcademicCapIcon />} color="#007BFF" />
        <StatCard title="Well-being Score" value={`${child.wellBeingScore}/10`} icon={<HeartIcon />} color="#DC3545" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark mb-4">Recent Alerts & Recommendations</h3>
        {child.riskLevel === RiskLevel.HIGH && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">High Risk Alert!</span> Liam's attendance and recent scores are concerning. Please schedule a meeting with his teacher.
          </div>
        )}
        {child.riskLevel === RiskLevel.MODERATE && (
          <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg" role="alert">
            <span className="font-medium">Moderate Risk Alert!</span> Noah's engagement has dropped. Encouraging participation in extracurriculars could help.
          </div>
        )}
        <ul className="space-y-3">
            <li className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                <div>
                    <h4 className="font-semibold">Homework Submission</h4>
                    <p className="text-secondary">All recent homework has been submitted on time. Great job!</p>
                </div>
            </li>
            <li className="flex items-start">
                <ExclamationIcon className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0"/>
                 <div>
                    <h4 className="font-semibold">Upcoming Math Test</h4>
                    <p className="text-secondary">A test is scheduled for next Friday. Extra preparation is recommended.</p>
                </div>
            </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-dark mb-4">Communicate with Teachers</h3>
        <textarea className="w-full p-2 border rounded-md" rows={3} placeholder={`Type a message to ${child.name}'s teachers...`}></textarea>
        <button className="mt-2 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition">Send Message</button>
      </div>

    </div>
  );
};


const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const AcademicCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.036l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ExclamationIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default DashboardPage;
