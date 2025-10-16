import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { REQUIRED_VALIDATION } from "../../../SERVICES/VALIDATIONS";
import type { QuizFormData, QuizTypes } from "../../../SERVICES/INTERFACES";

interface QuizPopUpProps {
  onSave?: (data: QuizFormData) => Promise<boolean>;
  mode: "add" | "edit" | "view";
  quizData?: QuizTypes;
}

const JoinQuizPopUp = forwardRef<
  { submitForm: () => Promise<boolean> },
  QuizPopUpProps
>(({ onSave, mode, quizData }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormData>({
    defaultValues: quizData || {
      title: "",
      duration: 10,
      questions_number: 5,
      score_per_question: 1,
      description: "",
      schadule: "",
      difficulty: "easy",
      type: "FE",
      group: "JSB",
    },
  });

  const onSubmit = async (data: QuizFormData) => {
    if (onSave) {
      const result = await onSave(data);
      return result;
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
    <div className="w-full max-w-4xl text-center">
      <h4 className="font-semibold text-sm my-4">Input the code received for the quiz below to join</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Code */}
        <div>
          <div className="flex border items-stretch border-gray-300 rounded-lg overflow-hidden w-[75%] mx-auto mb-8">
            <label
              htmlFor="code"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Code:
            </label>
            <input
              {...register("code", REQUIRED_VALIDATION("code"))}
              disabled={mode === "view"}
              type="text"
              id="code"
              className="px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              defaultValue={quizData ? quizData.code : ""}
            />
          </div>
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>
      </form>
    </div>
  );
});

export default JoinQuizPopUp;
