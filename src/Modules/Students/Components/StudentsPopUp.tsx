import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm } from "react-hook-form";
import { REQUIRED_VALIDATION } from "../../../SERVICES/VALIDATIONS";
import type { AddStudentFormData } from "../../../SERVICES/INTERFACES";

interface StudentsPopUpProps {
  onSave?: (data: AddStudentFormData) => void;
  mode: "add" | "edit" | "view";
  studentData?: AddStudentFormData;
}

const StudentsPopUp = forwardRef<
  { submitForm: () => Promise<boolean> },
  StudentsPopUpProps
>(({ onSave, mode, studentData }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddStudentFormData>({
    defaultValues: studentData || { name: "", phone: "" },
  });

  // Reset form when studentData changes (for edit mode)
  useEffect(() => {
    if (studentData) {
      reset(studentData);
    } else {
      reset({ name: "", phone: "" });
    }
  }, [studentData, reset]);

  const onSubmit = async (data: AddStudentFormData) => {
    if (onSave) {
      onSave(data);
      return true;
    }
    return false;
  };

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      let success = false;
      await handleSubmit(async (data) => {
        success = await onSubmit(data);
      })();
      return success;
    },
  }));

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="name"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Name
            </label>
            <input
              {...register("name", REQUIRED_VALIDATION("Name"))}
              disabled={mode === "view"}
              type="text"
              id="name"
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              placeholder=""
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="phone"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Phone
            </label>
            <input
              {...register("phone", REQUIRED_VALIDATION("Phone"))}
              disabled={mode === "view"}
              type="tel"
              id="phone"
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              placeholder=""
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </form>
    </div>
  );
});

export default StudentsPopUp;
