import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaKey,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { UserDataTypes } from "../../../../SERVICES/INTERFACES";
import { useState } from "react";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, REQUIRED_VALIDATION } from "../../../../SERVICES/VALIDATIONS";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance } from "../../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDataTypes>();

  const onSubmit = async (data: UserDataTypes) => {
    try {
      const response = await axiosInstance.post(AUTH_URLS.REGISTER, data);
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="block w-full">
      <h2 className="auth-title">
        Create your account and start using QuizWiz!
      </h2>
      <div className="flex justify-start items-center gap-10">
        <div
          onClick={() => navigate("/login")}
          className="px-15 py-5 bg-[#333333] rounded-lg cursor-pointer hover:bg-[#333333ac]"
        >
          <FaUserTie size={50} />
          <h5 className="mt-2">Sign in</h5>
        </div>

        <div className="px-15 py-5 bg-[#333333] border-5 border-[#C5D86D] rounded-lg">
          <FaUserPlus size={55} color="#C5D86D" />
          <h5 className="mt-2">Sign up</h5>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8">
        <div className="flex justify-between items-center gap-3 mb-5">
          {/* first name */}
          <div className="w-1/2">
            <label htmlFor="first-name" className="auth-input-lable block mb-1">
              Your first name
            </label>
            <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
              <FaIdCard size={30} />
              <input
                {...register("first_name", REQUIRED_VALIDATION("First Name"))}
                type="text"
                id="first-name"
                className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
                placeholder="Type your first name"
              />
            </div>
            {errors.first_name && (
            <p className="text-red-700">{errors.first_name.message as string}</p>
          )}
          </div>

          {/* last name */}
          <div className="w-1/2">
            <label htmlFor="last-name" className="auth-input-lable block mb-1">
              Your last name
            </label>
            <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
              <FaIdCard size={30} />
              <input
                {...register("last_name", REQUIRED_VALIDATION("Last Name"))}
                type="text"
                id="last-name"
                className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
                placeholder="Type your last name"
              />
            </div>
            {errors.last_name && (
            <p className="text-red-700">{errors.last_name.message as string}</p>
          )}
          </div>
        </div>

        {/* email */}
        <div className="mb-5">
          <label htmlFor="email" className="auth-input-lable block mb-1">
            Registered email address
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <input
              {...register("email", EMAIL_VALIDATION)}
              type="email"
              id="email"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-700">{errors.email.message as string}</p>
          )}
        </div>

        {/* role */}
        <div className="mb-5">
          <label htmlFor="role" className="auth-input-lable block mb-1">
            Your role
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <select
              {...register("role", REQUIRED_VALIDATION("Role"))}
              id="role"
              className="bg-transparent text-sm block w-full p-2.5 focus:outline-none rounded-lg"
            >
              <option selected disabled hidden value=''>Choose your role</option>
              <option className="text-[#0D1321] font-medium"  value="Instructor">Instructor</option>
              <option className="text-[#0D1321] font-medium" value="Student">Student</option>
            </select>
          </div>
          {errors.role && (
            <p className="text-red-700">{errors.role.message as string}</p>
          )}
        </div>

        {/* password */}
        <div className="mb-5">
          <label htmlFor="password" className="auth-input-lable block mb-1">
            Password
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <FaKey size={30} />
            <input
              {...register("password", PASSWORD_VALIDATION)}
              type={showPass ? "text" : "password"}
              id="password"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your password"
            />
            {!showPass ? (
              <FaEye
                onClick={() => setShowPass(!showPass)}
                size={30}
                className="cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPass(!showPass)}
                size={30}
                className="cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-700">{errors.password.message as string}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-black bg-white hover:bg-gray-200 cursor-pointer focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Sign Up <FaCheckCircle size={24} className="inline" />
          </button>
        </div>
      </form>
    </div>
  );
}
