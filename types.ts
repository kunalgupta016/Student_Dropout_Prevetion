
export enum Role {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
}

export interface Attendance {
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Mark {
  subject: string;
  score: number;
  maxScore: number;
}

export interface Behavior {
  date: string;
  report: string;
  reporter: string; // Teacher's name
}

export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  avatar: string;
  riskLevel: RiskLevel;
  parentId: string;
  teacherIds: string[];
  attendance: Attendance[];
  marks: Mark[];
  behavior: Behavior[];
  engagement: number; // 0-100
  wellBeingScore: number; // 1-10
  socioEconomicBG: 'Low' | 'Medium' | 'High';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  text: string;
  timestamp: string;
}
