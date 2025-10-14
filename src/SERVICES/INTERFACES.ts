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
  closed_at: string
}

export interface QuizTypes {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  instructor: string;
  group: string;
  questions_number: number;
  questions: [QuestionTypes];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
  updatedAt: string;
  participants: number; 
}

export interface StudentTypes {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  role: "Student";
  createdAt?: string;
  updatedAt?: string;
  avg_score?: number;
  rank?: number;
  group?: GroupTypes;
}

export interface AddStudentFormData {
  name: string;
  phone: string;
}

export interface QuizFormData {
  title: string;
  duration: number;
  questions_number: number;
  score_per_question: number;
  description: string;
  schadule: string;
  difficulty: "easy" | "medium" | "hard";
  type: string;
  group: string;
}

export interface FormDataProps {
  id?: string | null;
  mode: "add" | "edit" | "view";
}

export interface GroupTypes {
  _id?: string;
  name: string;
  instructor: string;
  status: "active" | "inactive";
  students: [StudentTypes];
  max_students: number;
}
