import {
  FaCheckCircle
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { loginDataTypes } from "../../../../SERVICES/INTERFACES";
import { REQUIRED_VALIDATION } from "../../../../SERVICES/VALIDATIONS";
import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstance } from "../../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginDataTypes>();

  const onSubmit = async (data: loginDataTypes) => {
    try {
      const response = await axiosInstance.post(AUTH_URLS.FORGET_PASSWORD, data);
      toast.success(response?.data?.message);
      navigate("/reset-password", { state: { email: data } });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="block w-full">
      <h2 className="auth-title">Forgot Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8">
        {/* email */}
        <div className="mb-5">
          <label htmlFor="email" className="auth-input-lable block mb-1">
            Email address
          </label>
          <div className="flex justify-start items-center border-3 rounded-lg px-4 py-1">
            <MdEmail size={30} />
            <input
              {...register("email", REQUIRED_VALIDATION("Email"))}
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

        <div className="flex justify-between items-center mt-30">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-black bg-white hover:bg-gray-200 cursor-pointer focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Send email <FaCheckCircle size={24} className="inline" />
          </button>

          <div>
            <p>
              Login? {' '}
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
