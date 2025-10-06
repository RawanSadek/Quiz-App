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