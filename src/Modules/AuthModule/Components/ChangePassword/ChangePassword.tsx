import { FaCheckCircle, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ChangePasswordTypes } from "../../../../SERVICES/INTERFACES";
import { useEffect, useState } from "react";
import {
  CONFIRM_PASSWORD_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../../SERVICES/VALIDATIONS";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance } from "../../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<ChangePasswordTypes>();

  const onSubmit = async (data: ChangePasswordTypes) => {
    const apiData = {
      password: data.password,
      password_new: data.password_new,
    };
    try {
      const response = await axiosInstance.post(
        AUTH_URLS.CHANGE_PASSWORD,
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
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (watch("confirmPassword")) 
      trigger("confirmPassword");
  }, [watch("password_new")]);

  return (
    <div className="block w-full">
      <h2 className="auth-title">Change Passsword</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8">
        {/* old password */}
        <div className="mb-5">
          <label htmlFor="password" className="auth-input-lable block mb-1">
            Old Password
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <FaKey size={30} />
            <input
              {...register("password", REQUIRED_VALIDATION("Old Password"))}
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

        {/* new password */}
        <div className="mb-5">
          <label htmlFor="password_new" className="auth-input-lable block mb-1">
            New Password
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <FaKey size={30} />
            <input
              {...register("password_new", PASSWORD_VALIDATION)}
              type={showNewPass ? "text" : "password"}
              id="password_new"
              className="bg-transparent text-sm block w-full p-2.5 placeholder-white focus:outline-none"
              placeholder="Type your new password"
            />
            {!showNewPass ? (
              <FaEye
                onClick={() => setShowNewPass(!showNewPass)}
                size={30}
                className="cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowNewPass(!showNewPass)}
                size={30}
                className="cursor-pointer"
              />
            )}
          </div>
          {errors.password_new && (
            <p className="text-red-700">
              {errors.password_new.message as string}
            </p>
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
                  (document.getElementById("password_new") as HTMLInputElement)
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
