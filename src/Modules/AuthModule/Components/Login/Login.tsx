import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { loginDataTypes } from "../../../../SERVICES/INTERFACES";
import { useState } from "react";
import { REQUIRED_VALIDATION } from "../../../../SERVICES/VALIDATIONS";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance } from "../../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginDataTypes>();

  const onSubmit = async (data: loginDataTypes) => {
    try {
      const response = await axiosInstance.post(AUTH_URLS.LOGIN, data);
      console.log(response)
      localStorage.setItem('token', response.data.token);
      toast.success(`Welcome to QuizWiz!`);
      navigate('/dashboard');

    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="block w-full">
      <h2 className="auth-title">
        Continue your learning journey with QuizWiz!
      </h2>
      <div className="flex justify-start items-center gap-10">
        <div className="px-15 py-5 bg-[#333333] border-5 border-[#C5D86D] rounded-lg">
          <FaUserTie size={50} color="#C5D86D" />
          <h5 className="mt-2">Sign in</h5>
        </div>

        <div
          onClick={() => navigate("/register")}
          className="px-15 py-5 bg-[#333333] rounded-lg cursor-pointer hover:bg-[#333333ac]"
        >
          <FaUserPlus size={55} />
          <h5 className="mt-2">Sign up</h5>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8">
        {/* email */}
        <div className="mb-5">
          <label htmlFor="email" className="auth-input-lable block mb-1">
            Registered email address
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <input
            {...register("email", REQUIRED_VALIDATION('Email'))}
              type="email"
              id="email"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your email"
            />
          </div>
            {errors.email && <p className='text-red-700'>{errors.email.message as string}</p>}
        </div>
        {/* password */}
        <div className="mb-5">
          <label htmlFor="password" className="auth-input-lable block mb-1">
            Password
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <FaKey size={30} />
            <input
            {...register("password", REQUIRED_VALIDATION('Password'))}
              type={showPass?"text":"password"}
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
          {errors.password && <p className='text-red-700'>{errors.password.message as string}</p>}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-black bg-white hover:bg-gray-200 cursor-pointer focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Sign In <FaCheckCircle size={24} className="inline" />
          </button>

          <div>
            <p>
              Forgot Password?{" "}
              <Link to="/forgot-password" className="text-[#C5D86D] underline">
                click here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
