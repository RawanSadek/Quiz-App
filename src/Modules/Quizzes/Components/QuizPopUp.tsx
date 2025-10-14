import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm } from "react-hook-form";
import { REQUIRED_VALIDATION } from "../../../SERVICES/VALIDATIONS";
import type { QuizFormData, QuizTypes } from "../../../SERVICES/INTERFACES";

interface QuizPopUpProps {
  onSave?: (data: QuizFormData) => Promise<boolean>;
  mode: "add" | "edit" | "view";
  quizData?: QuizTypes;
}

const QuizPopUp = forwardRef<
  { submitForm: () => Promise<boolean> },
  QuizPopUpProps
>(({ onSave, mode, quizData }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  // Reset form when quizData changes (for edit mode)
  useEffect(() => {
  if (quizData) {
    reset({
      schadule: quizData.schadule
        ? new Date(quizData.schadule).toISOString().slice(0, 16)
        : '',
      score_per_question: quizData.score_per_question,
      // ... other fields
    });
  }
}, [quizData, reset]);

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
    <div className="w-full max-w-4xl">
      <h4 className="font-semibold text-lg mb-4">Details</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <div className="flex border items-stretch border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="title"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Title:
            </label>
            <input
              {...register("title", REQUIRED_VALIDATION("Title"))}
              disabled={mode === "view"}
              type="text"
              id="title"
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              placeholder="Enter quiz title"
              defaultValue={quizData ? quizData.title : ""}
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* First Row: Duration, Questions, Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Duration */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="duration"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
                style={{ minWidth: "120px" }}
              >
                Duration (in minutes)
              </label>
              <select
                {...register("duration", REQUIRED_VALIDATION("Duration"))}
                disabled={mode === "view"}
                id="duration"
                className="flex-1 px-3 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
                defaultValue={quizData ? quizData.duration : ""}
              >
                <option selected disabled hidden value=""></option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
                <option value={60}>60</option>
              </select>
            </div>
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Number of questions */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="questions_number"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
                style={{ minWidth: "120px" }}
              >
                No. of questions
              </label>
              <select
                {...register(
                  "questions_number",
                  REQUIRED_VALIDATION("Number of questions")
                )}
                disabled={mode === "view"}
                id="questions_number"
                className="flex-1 px-3 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
                defaultValue={quizData ? quizData.questions_number : ""}
              >
                <option selected disabled hidden value=""></option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </select>
            </div>
            {errors.questions_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.questions_number.message}
              </p>
            )}
          </div>

          {/* Score per question */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="score_per_question"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
                style={{ minWidth: "120px" }}
              >
                Score per question
              </label>
              <select
                {...register(
                  "score_per_question",
                  REQUIRED_VALIDATION("Score per question")
                )}
                disabled={mode === "view"}
                id="score_per_question"
                className="flex-1 px-3 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
                defaultValue={quizData ? quizData.score_per_question : ""}
              >
                <option selected disabled hidden value=""></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
            {errors.score_per_question && (
              <p className="text-red-500 text-sm mt-1">
                {errors.score_per_question.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="description"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Description
            </label>
            <textarea
              {...register("description", REQUIRED_VALIDATION("Description"))}
              disabled={mode === "view"}
              id="description"
              rows={3}
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm resize-none"
              placeholder="Enter quiz description"
              defaultValue={quizData ? quizData.description : ""}
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Schedule */}
        <div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="schadule"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Schedule
            </label>
            <input
              {...register("schadule", REQUIRED_VALIDATION("Schedule"))}
              disabled={mode === "view"}
              type="datetime-local"
              id="schadule"
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              defaultValue={
                quizData?.schadule
                  ? new Date(quizData.schadule).toISOString().slice(0, 16)
                  : ""
              }
            />
          </div>
          {errors.schadule && (
            <p className="text-red-500 text-sm mt-1">
              {errors.schadule.message}
            </p>
          )}
        </div>

        {/* Second Row: Difficulty, Category, Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Difficulty level */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="difficulty"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
                style={{ minWidth: "100px" }}
              >
                Difficulty level
              </label>
              <select
                {...register(
                  "difficulty",
                  REQUIRED_VALIDATION("Difficulty level")
                )}
                disabled={mode === "view"}
                id="difficulty"
                className="flex-1 px-3 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
                defaultValue={quizData? quizData.difficulty:''}
              >
                <option selected disabled hidden value=''></option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            {errors.difficulty && (
              <p className="text-red-500 text-sm mt-1">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          {/* Category type */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="type"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
                style={{ minWidth: "100px" }}
              >
                Category type
              </label>
              <select
                {...register("type", REQUIRED_VALIDATION("Category type"))}
                disabled={mode === "view"}
                id="type"
                className="flex-1 px-3 py-3 focus:outline-none disabled:bg-gray-100 text-sm"
              >
                <option value="FE">FE</option>
                <option value="BE">BE</option>
                <option value="DO">DO</option>
              </select>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Group name */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <label
                htmlFor="group"
                className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center w-fit whitespace-nowrap"
              >
                Group name
              </label>
              <input
              {...register("group", REQUIRED_VALIDATION("Group id"))}
              disabled={mode === "view"}
              type="text"
              id="group"
              className="flex-1 px-4 py-3 focus:outline-none disabled:bg-gray-100 text-xs"
              placeholder="Enter group id"
              defaultValue={quizData ? quizData.group : ""}
            />
            </div>
            {errors.group && (
              <p className="text-red-500 text-sm mt-1">
                {errors.group.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default QuizPopUp;
