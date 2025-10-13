import type { ReactNode } from "react";

export interface loginDataTypes {
  email: string;
  password: string;
}

export interface UserDataTypes {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: "Instructor" | "Student";
  _id: string;
  status: string;
  profilePicture?: string;
}

export interface ResetPasswordTypes {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordTypes {
  password: string;
  password_new: string;
  confirmPassword: string;
}

export interface ProtectedRoutesProps {
  children: ReactNode;
}

export interface QuestionTypes {
  _id?: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  points?: number;
  type: string;
}

export interface ResultTypes {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  type: string;
  createdAt: string;
  questions_number: number;
  score_per_question: number;
}

export interface QuizTypes {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
  updatedAt: string;
}

export interface StudentTypes {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: string;
  role: "Student";
  createdAt: string;
  updatedAt: string;
  avg_score?: number;
  rank?: number;
}

export interface AddStudentFormData {
  name: string;
  phone: string;
}
  participants?: any[]; 
}

export interface FormDataProps {
  id?: string | null;
  mode: "add" | "edit" | "view";
}

export interface GroupTypes {
  _id?: string;
  name: string;
  instructor: string
  status: 'active' | 'inactive';
  students: [StudentTypes]
  max_students: number;
}

export interface StudentTypes {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'Student';
  avg_score: number;
  group: GroupTypes;
  status: 'active' | 'inactive';
}

