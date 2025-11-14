
import { User, Student, Teacher, Role, RiskLevel } from '../types';

export const mockUsers: User[] = [
  { id: 'admin01', name: 'Dr. Evelyn Reed', role: Role.ADMIN, email: 'e.reed@school.edu', avatar: 'https://picsum.photos/seed/admin/100/100' },
  { id: 'teacher01', name: 'Mr. David Chen', role: Role.TEACHER, email: 'd.chen@school.edu', avatar: 'https://picsum.photos/seed/teacher1/100/100' },
  { id: 'teacher02', name: 'Ms. Maria Garcia', role: Role.TEACHER, email: 'm.garcia@school.edu', avatar: 'https://picsum.photos/seed/teacher2/100/100' },
  { id: 'parent01', name: 'Mrs. Sarah Davis', role: Role.PARENT, email: 's.davis@email.com', avatar: 'https://picsum.photos/seed/parent1/100/100' },
  { id: 'parent02', name: 'Mr. John Miller', role: Role.PARENT, email: 'j.miller@email.com', avatar: 'https://picsum.photos/seed/parent2/100/100' },
  { id: 'student01', name: 'Liam Davis', role: Role.STUDENT, email: 'l.davis@student.edu', avatar: 'https://picsum.photos/seed/student1/100/100' },
  { id: 'student02', name: 'Olivia Miller', role: Role.STUDENT, email: 'o.miller@student.edu', avatar: 'https://picsum.photos/seed/student2/100/100' },
  { id: 'student03', name: 'Noah Wilson', role: Role.STUDENT, email: 'n.wilson@student.edu', avatar: 'https://picsum.photos/seed/student3/100/100' },
];

export const mockTeachers: Teacher[] = [
  { id: 'teacher01', name: 'Mr. David Chen', subject: 'Mathematics', avatar: 'https://picsum.photos/seed/teacher1/100/100' },
  { id: 'teacher02', name: 'Ms. Maria Garcia', subject: 'Science', avatar: 'https://picsum.photos/seed/teacher2/100/100' },
];

export const mockStudents: Student[] = [
  {
    id: 'student01',
    name: 'Liam Davis',
    class: 'Grade 10',
    age: 16,
    avatar: 'https://picsum.photos/seed/student1/100/100',
    riskLevel: RiskLevel.HIGH,
    parentId: 'parent01',
    teacherIds: ['teacher01', 'teacher02'],
    attendance: [
      { date: '2023-10-01', status: 'Present' }, { date: '2023-10-02', status: 'Absent' }, { date: '2023-10-03', status: 'Present' }, { date: '2023-10-04', status: 'Late' }, { date: '2023-10-05', status: 'Absent' },
    ],
    marks: [
      { subject: 'Mathematics', score: 55, maxScore: 100 }, { subject: 'Science', score: 62, maxScore: 100 }, { subject: 'History', score: 70, maxScore: 100 },
    ],
    behavior: [
      { date: '2023-09-15', report: 'Distracted in class.', reporter: 'Mr. David Chen' }, { date: '2023-10-02', report: 'Did not submit homework.', reporter: 'Ms. Maria Garcia' }
    ],
    engagement: 40,
    wellBeingScore: 4,
    socioEconomicBG: 'Low',
  },
  {
    id: 'student02',
    name: 'Olivia Miller',
    class: 'Grade 10',
    age: 15,
    avatar: 'https://picsum.photos/seed/student2/100/100',
    riskLevel: RiskLevel.LOW,
    parentId: 'parent02',
    teacherIds: ['teacher01', 'teacher02'],
    attendance: [
       { date: '2023-10-01', status: 'Present' }, { date: '2023-10-02', status: 'Present' }, { date: '2023-10-03', status: 'Present' }, { date: '2023-10-04', status: 'Present' }, { date: '2023-10-05', status: 'Present' },
    ],
    marks: [
      { subject: 'Mathematics', score: 92, maxScore: 100 }, { subject: 'Science', score: 88, maxScore: 100 }, { subject: 'History', score: 95, maxScore: 100 },
    ],
    behavior: [
        { date: '2023-09-20', report: 'Very participative in class discussions.', reporter: 'Mr. David Chen' }
    ],
    engagement: 95,
    wellBeingScore: 9,
    socioEconomicBG: 'High',
  },
   {
    id: 'student03',
    name: 'Noah Wilson',
    class: 'Grade 10',
    age: 16,
    avatar: 'https://picsum.photos/seed/student3/100/100',
    riskLevel: RiskLevel.MODERATE,
    parentId: 'parent03',
    teacherIds: ['teacher01'],
    attendance: [
      { date: '2023-10-01', status: 'Present' }, { date: '2023-10-02', status: 'Present' }, { date: '2023-10-03', status: 'Late' }, { date: '2023-10-04', status: 'Present' }, { date: '2023-10-05', status: 'Absent' },
    ],
    marks: [
      { subject: 'Mathematics', score: 75, maxScore: 100 }, { subject: 'Science', score: 68, maxScore: 100 }, { subject: 'History', score: 80, maxScore: 100 },
    ],
    behavior: [
        { date: '2023-10-01', report: 'Seems withdrawn lately.', reporter: 'Mr. David Chen' }
    ],
    engagement: 65,
    wellBeingScore: 6,
    socioEconomicBG: 'Medium',
  },
];
