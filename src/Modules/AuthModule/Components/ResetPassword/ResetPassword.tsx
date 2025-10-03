import { FaCheckCircle, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ResetPasswordTypes } from "../../../../SERVICES/INTERFACES";
import { useState } from "react";
import {
  CONFIRM_PASSWORD_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../../SERVICES/VALIDATIONS";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance } from "../../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
export default function ResetPassword() {
  const { state } = useLocation();
  const email = state.email.email;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordTypes>();

  const onSubmit = async (data: ResetPasswordTypes) => {
    const apiData = {
      otp: data.otp,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axiosInstance.post(
        AUTH_URLS.RESET_PASSWORD,
        apiData
      );
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="block w-full">
      <h2 className="auth-title">Reset Passsword</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8">
        {/* email */}
        <div className="mb-5">
          <label htmlFor="email" className="auth-input-lable block mb-1">
            Your email address
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <input
              {...register("email", REQUIRED_VALIDATION("Email"))}
              disabled
              defaultValue={email}
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

        {/* OTP */}
        <div className="mb-5">
          <label htmlFor="email" className="auth-input-lable block mb-1">
            OTP
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <input
              {...register("otp", REQUIRED_VALIDATION("OTP"))}
              type="otp"
              id="otp"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your OTP"
            />
          </div>
          {errors.otp && (
            <p className="text-red-700">{errors.otp.message as string}</p>
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

        {/* confirm password */}
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="auth-input-lable block mb-1"
          >
            Confirm Password
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <FaKey size={30} />
            <input
              {...register(
                "confirmPassword",
                CONFIRM_PASSWORD_VALIDATION(
                  (document.getElementById("password") as HTMLInputElement)
                    ?.value
                )
              )}
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your confirm password"
            />
            {!showConfirmPass ? (
              <FaEye
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                size={30}
                className="cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                size={30}
                className="cursor-pointer"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-700">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-black bg-white hover:bg-gray-200 cursor-pointer focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Reset <FaCheckCircle size={24} className="inline" />
          </button>
        </div>
      </form>
    </div>
  );
}
