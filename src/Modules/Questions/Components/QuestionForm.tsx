import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { axiosInstance, QUESTIONS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type {
  FormDataProps,
  QuestionTypes,
} from "../../../SERVICES/INTERFACES";
import { useForm } from "react-hook-form";
import { REQUIRED_VALIDATION } from "../../../SERVICES/VALIDATIONS";
import dataLoading from "../../../assets/Images/loadingData.gif";

const QuestionForm = forwardRef(({ id, mode }: FormDataProps, ref) => {
  const [questionDetails, setQuestionDetails] = useState<QuestionTypes>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuestionTypes>();

  const onSubmit = async (data: QuestionTypes) => {
    try {
      if (mode == "add") {
        const response = await axiosInstance.post(
          QUESTIONS_URLS.CREATE_QUESTION,
          data
        );
        toast.success(response?.data?.message);
      } else if (mode === "edit" && id) {
        const response = await axiosInstance.put(
          QUESTIONS_URLS.UPDATE_QUESTION(id),
          data
        );
        toast.success(response?.data?.message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      let success = false;
      await handleSubmit(async (data) => {
        await onSubmit(data);
        success = true; // only if the validation passed
      })();
      return success;
    },
  }));

  const getQuestionById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(QUESTIONS_URLS.GET_BY_ID(id));
      setQuestionDetails(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) getQuestionById(id);
  }, []);

  useEffect(() => {
    if (id && questionDetails) {
      reset({
        type: questionDetails.type,
        answer: questionDetails.answer,
        difficulty: questionDetails.difficulty,
        points: questionDetails.points,
        options: {
          A: questionDetails.options.A,
          B: questionDetails.options.B,
          C: questionDetails.options.C,
          D: questionDetails.options.D,
        },
      });
    }
  }, [id, questionDetails, reset]);

  return (
    <div>
      {/* loading */}
      {isSubmitting && (
        <div className="bg-[#d1d1d18f] w-full h-full absolute top-0 left-0 rounded-2xl cursor-not-allowed z-[999999]">
          <img
            src={dataLoading}
            alt="loading"
            className="w-[60%] md:w-[35%] mt-[8%] !mx-auto"
          />
        </div>
      )}

      {loading && (
        <div className="bg-[#d1d1d18f] w-full h-full absolute top-0 left-0 rounded-2xl cursor-not-allowed z-[999999]">
          <img
            src={dataLoading}
            alt="loading"
            className="w-[60%] md:w-[35%] mt-[8%] !mx-auto"
          />
        </div>
      )}

      <div>
        <h4 className="font-semibold">Details</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="my-3">
          {/* Title */}
          <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
            <label
              htmlFor="title"
              className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
            >
              Title:
            </label>
            <input
              disabled={mode === "view"}
              defaultValue={id ? questionDetails?.title : ""}
              {...register("title", REQUIRED_VALIDATION("Title"))}
              type="text"
              id="title"
              className="w-full focus:outline-0"
            />
          </div>
          {errors.title && (
            <p className="text-red-700">{errors.title.message as string}</p>
          )}

          {/* Description */}
          <div className="flex justify-start items-stretch gap-3 border border-gray-300 rounded-lg pe-1 mt-3">
            <label
              htmlFor="description"
              className="bg-[#FFEDDF] rounded-lg py-3 px-4 font-semibold flex items-center"
            >
              Description:
            </label>
            <textarea
              disabled={mode === "view"}
              defaultValue={id ? questionDetails?.description : ""}
              {...register("description", REQUIRED_VALIDATION("Description"))}
              id="description"
              className="w-full focus:outline-0"
            />
          </div>

          {/* Options */}
          <div className="flex justify-between items-center gap-3 w-full">
            {/* A */}
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="A"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
                >
                  A:
                </label>
                <input
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.options.A : ""}
                  {...register("options.A", REQUIRED_VALIDATION("Option A"))}
                  type="text"
                  id="A"
                  className="w-full focus:outline-0 text-black"
                />
              </div>
              {errors.options?.A && (
                <p className="text-red-700">
                  {errors.options?.A.message as string}
                </p>
              )}
            </div>
            {/* B */}
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="B"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
                >
                  B:
                </label>
                <input
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.options.B : ""}
                  {...register("options.B", REQUIRED_VALIDATION("Option B"))}
                  type="text"
                  id="B"
                  className="w-full focus:outline-0 text-black"
                />
              </div>
              {errors.options?.B && (
                <p className="text-red-700">
                  {errors.options?.B.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-3 w-full">
            {/* C */}
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="C"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
                >
                  C:
                </label>
                <input
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.options.C : ""}
                  {...register("options.C", REQUIRED_VALIDATION("Option C"))}
                  type="text"
                  id="C"
                  className="w-full focus:outline-0 text-black"
                />
              </div>
              {errors.options?.C && (
                <p className="text-red-700">
                  {errors.options?.C.message as string}
                </p>
              )}
            </div>

            {/* D */}
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="D"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
                >
                  D:
                </label>
                <input
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.options.D : ""}
                  {...register("options.D", REQUIRED_VALIDATION("Option D"))}
                  type="text"
                  id="D"
                  className="w-full focus:outline-0 text-black"
                />
              </div>
              {errors.options?.D && (
                <p className="text-red-700">
                  {errors.options?.D.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full">
            {/* Answer */}
            <div className="w-full md:w-1/3">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="answer"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold w-1/2 md:w-3/4 "
                >
                  Right Answer:
                </label>
                <select
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.answer : ""}
                  {...register("answer", REQUIRED_VALIDATION("Answer"))}
                  id="answer"
                  className="focus:outline-0 w-1/2 md:w-1/4"
                >
                  <option selected disabled hidden value=""></option>
                  <option className="text-[#0D1321] font-medium" value="A">
                    A
                  </option>
                  <option className="text-[#0D1321] font-medium" value="B">
                    B
                  </option>
                  <option className="text-[#0D1321] font-medium" value="C">
                    C
                  </option>
                  <option className="text-[#0D1321] font-medium" value="D">
                    D
                  </option>
                </select>
              </div>
              {errors.answer && (
                <p className="text-red-700">
                  {errors.answer.message as string}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="w-full md:w-1/3">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="answer"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold w-1/2 md:w-3/4"
                >
                  Category Type:
                </label>
                <select
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.type : ""}
                  {...register("type", REQUIRED_VALIDATION("Category"))}
                  id="type"
                  className="focus:outline-0 w-1/2 md:w-1/4"
                >
                  <option selected disabled hidden value=""></option>
                  <option className="text-[#0D1321] font-medium" value="FE">
                    FE
                  </option>
                  <option className="text-[#0D1321] font-medium" value="BE">
                    BE
                  </option>
                  <option className="text-[#0D1321] font-medium" value="DO">
                    DO
                  </option>
                </select>
              </div>
              {errors.type && (
                <p className="text-red-700">{errors.type.message as string}</p>
              )}
            </div>

            {/* Diffeculty Level */}
            <div className="w-full md:w-1/3">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="answer"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold w-1/2 md:w-3/4"
                >
                  Difficulty Level:
                </label>
                <select
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.difficulty : ""}
                  {...register(
                    "difficulty",
                    REQUIRED_VALIDATION("Difficulty Level")
                  )}
                  id="difficulty"
                  className="focus:outline-0 w-1/2 md:w-1/4"
                >
                  <option selected disabled hidden value=""></option>
                  <option className="text-[#0D1321] font-medium" value="easy">
                    Easy
                  </option>
                  <option className="text-[#0D1321] font-medium" value="medium">
                    Medium
                  </option>
                  <option className="text-[#0D1321] font-medium" value="hard">
                    Hard
                  </option>
                </select>
              </div>
              {errors.difficulty && (
                <p className="text-red-700">
                  {errors.difficulty.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
                <label
                  htmlFor="points"
                  className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold"
                >
                  Points:
                </label>
                <input
                  disabled={mode === "view"}
                  defaultValue={id ? questionDetails?.points : ""}
                  {...register("points", REQUIRED_VALIDATION("Points"))}
                  type="number"
                  id="points"
                  className="w-full focus:outline-0 text-black"
                />
              </div>
              {errors.points && (
                <p className="text-red-700">
                  {errors.points.message as string}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default QuestionForm;
