import React, { useState, useEffect, useRef } from 'react';
import { mockStudents } from '../../services/mockData';
import { User, Student } from '../../types';
import { getChatbotResponse, generateImprovementPlan } from '../../services/geminiService';

interface DashboardPageProps {
  user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'chatbot'
  const [improvementPlan, setImprovementPlan] = useState<string>('');
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);

  useEffect(() => {
    const currentStudent = mockStudents.find(s => s.id === user.id);
    setStudent(currentStudent || null);
    
    const fetchPlan = async () => {
      if (currentStudent) {
        setIsLoadingPlan(true);
        const plan = await generateImprovementPlan(currentStudent);
        setImprovementPlan(plan);
        setIsLoadingPlan(false);
      }
    };
    fetchPlan();
  }, [user.id]);

  if (!student) {
    return <div>Loading student data...</div>;
  }
  
  const averageScore = student.marks.reduce((acc, m) => acc + (m.score / m.maxScore), 0) / student.marks.length * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-dark">My Dashboard</h2>
        <p className="text-secondary mt-1">Here's a summary of your progress.</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-gray-500">Engagement</p>
            <p className="text-2xl font-bold text-success">{student.engagement}/100</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-sm text-gray-500">Risk Level</p>
            <p className={`text-2xl font-bold ${student.riskLevel === 'High' ? 'text-danger' : student.riskLevel === 'Moderate' ? 'text-warning' : 'text-success'}`}>{student.riskLevel}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                 <button
                    onClick={() => setActiveTab('plan')}
                    className={`${activeTab === 'plan' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                 >
                    My Improvement Plan
                 </button>
                 <button
                    onClick={() => setActiveTab('chatbot')}
                    className={`${activeTab === 'chatbot' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                 >
                    AI Counselor
                 </button>
            </nav>
        </div>
        <div className="p-6">
            {activeTab === 'plan' && (
                <div>
                    {isLoadingPlan ? <p>Loading your personalized plan...</p> : 
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: improvementPlan.replace(/\n/g, '<br />')}}/>}
                </div>
            )}
            {activeTab === 'chatbot' && <AIChatbot />}
        </div>
      </div>
    </div>
  );
};

const AIChatbot: React.FC = () => {
    const [history, setHistory] = useState<{ role: string, parts: { text: string }[] }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (history.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                 setHistory([{ role: 'model', parts: [{ text: "Hello! I'm your AI Counselor. How are you feeling today? You can ask me for advice or just chat about what's on your mind."}] }]);
                 setIsLoading(false);
            }, 500)
        }
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [history]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { role: 'user', parts: [{ text: input }] };
        const newHistory = [...history, userMessage];
        setHistory(newHistory);
        setInput('');
        setIsLoading(true);

        const response = await getChatbotResponse(newHistory);
        const modelMessage = { role: 'model', parts: [{ text: response }] };
        setHistory([...newHistory, modelMessage]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-[60vh] bg-gray-50 rounded-lg">
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                {history.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-dark'}`}>
                           <div dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\n/g, '<br />') }}/>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-xl bg-gray-200 text-dark">
                            <span className="animate-pulse">...</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-primary text-white p-2 rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
