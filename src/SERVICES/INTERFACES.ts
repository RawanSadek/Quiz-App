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
  _id:string;
  status:string;
  profilePicture?:string;
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
    "A": string;
    "B": string;
    "C": string;
    "D": string;
    _id: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  type: string
}
export interface ResultTypes {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  type: string;
  closed_at: string; 
  createdAt: string;
  questions_number: number;
  score_per_question: number;
  participants?: any[]; 
}