import { BiSolidAlarmAdd } from "react-icons/bi";
import { CiVault } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import upcommingQuiz1 from "../../../assets/Images/upcommingQuiz1.png";
import upcommingQuiz2 from "../../../assets/Images/upcommingQuiz2.png";
import dataLoading from "../../../assets/Images/loadingData.gif";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance, QUIZZES_URLS } from "../../../SERVICES/ENDPOINTS";
import { useEffect, useState } from "react";
import type { QuizTypes } from "../../../SERVICES/INTERFACES";
import { formatDate } from "../../../SERVICES/FORMATDATE";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { axiosInstance, QUIZZES_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { QuizFormData } from "../../../SERVICES/INTERFACES";
import FormPopUp from "../../Shared/Components/FormPopUp/FormPopUp";
import QuizPopUp from "./QuizPopUp";
import { useRef, useState } from "react";

export default function Quizzes() {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<QuizTypes[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<QuizTypes[]>([]);
  const [loadingUpcommingQuizzes, setLoadingUpcommingQuizzes] = useState(false);
  const [loadingCompletedQuizzes, setLoadingCompletedQuizzes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const formRef = useRef<{ submitForm: () => Promise<boolean> }>(null);

  const navigate = useNavigate();

  const getUpcomingQuizzes = async () => {
    setLoadingUpcommingQuizzes(true);
    try {
      const response = await axiosInstance.get(QUIZZES_URLS.GET_UPCOMING);
      setUpcomingQuizzes(response?.data?.slice(0, 2) || []);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoadingUpcommingQuizzes(false);
  };

  const getCompletedQuizzes = async () => {
    setLoadingCompletedQuizzes(true);
    try {
      const response = await axiosInstance.get(QUIZZES_URLS.GET_COMPLETED);
      setCompletedQuizzes(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoadingCompletedQuizzes(false);
  };
    
    const handleOpenQuizForm = (title: string, mode: "add" | "edit" | "view") => {
    setFormMode(mode);
    setFormTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = async () => {
    const success = await formRef.current?.submitForm();
    if (success) {
      handleCloseClick();
    }
  };

  const handleSaveQuiz = async (data: QuizFormData) => {
    try {
      const quizData = {
        title: data.title,
        description: data.description,
        duration: data.duration,
        questions_number: data.questions_number,
        schadule: data.schadule,
        score_per_question: data.score_per_question,
        difficulty: data.difficulty,
        type: data.type,
        group: data.group,
        status: "draft" as const,
        instructor: "current-instructor-id", // This should come from user state
      };

      const response = await axiosInstance.post(
        QUIZZES_URLS.CREATE_QUIZ,
        quizData
      );
      toast.success(response?.data?.message || "Quiz created successfully");
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return false;
    }
  };

  useEffect(() => {
    getUpcomingQuizzes();
    getCompletedQuizzes();
  }, []);

  return (
    <>
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        {/* Set up new quiz */}
        <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-400 min-w-[190px]">
          <BiSolidAlarmAdd className="text-[55px] mx-auto" />
          <h3 className="text-lg font-semibold">Set up a new quiz</h3>
        </div>

        {/* Questions bank */}
        <Link
          to="/dashboard/questions"
          className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-400 min-w-[190px]"
        >
          <CiVault className="text-[55px] mx-auto" />
          <h3 className="text-lg font-semibold">Question Bank</h3>
        </Link>
      </div>

      <div className="flex flex-col justify-start items-start flex-grow gap-3 w-full px-4">
        {/* Upcomming Quizzes */}
        <div className="p-3 border border-gray-300 rounded-lg w-full">
          <h3 className="font-semibold text-lg">Upcomming quizzes</h3>
          {loadingUpcommingQuizzes && (
            <img
              src={dataLoading}
              alt="loading"
              className="w-[17%]  !mx-auto"
            />
          )}
          {!loadingUpcommingQuizzes && upcomingQuizzes.length === 0 && (
            <p className="text-center py-6 text-gray-400 text-[14px]">
              No upcomming quizzes !
            </p>
          )}
          {upcomingQuizzes.length !== 0 && (
            <div className="flex flex-col justify-between items-start gap-3 my-4">
              {/* first upcomming quiz */}
              <div className="flex justify-start items-center border border-gray-300 rounded-lg">
                <div className="bg-[#FFEDDF] p-3 rounded-lg w-1/6">
                  <img
                    src={upcommingQuiz1}
                    alt="upcomming Quiz 1"
                    className="w-[90%] mx-auto"
                  />
                </div>
                <div className="px-3 py-2 mt-auto flex-grow">
                  <h2 className="font-semibold text-lg">
                    {upcomingQuizzes[0]?.title}
                  </h2>
                  <p className="text-gray-600 text-[15px]">
                    {formatDate(upcomingQuizzes[0].schadule).split(",")[0]} |{" "}
                    {formatDate(upcomingQuizzes[0].schadule).split(",")[1]}
                  </p>
                  <div className="flex justify-between items-center font-semibold text-[14px] mt-5">
                    <p>
                      No. of students enrolled:{" "}
                      {upcomingQuizzes[0]?.participants}
                    </p>
                    <div
                      onClick={() =>
                        navigate("/dashboard/quiz-details", {
                          state: { quiz: upcomingQuizzes[0]?._id },
                        })
                      }
                      className="cursor-pointer group"
                    >
                      Open
                      <FaCircleArrowRight
                        size={18}
                        color="#C5D86D"
                        className="inline mx-1 group-hover:translate-x-1.5 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* second upcomming quiz */}
              {upcomingQuizzes[1] && (
                <div className="flex justify-start items-center border border-gray-300 rounded-lg">
                  <div className="bg-[#FFEDDF] p-3 rounded-lg w-1/6">
                    <img
                      src={upcommingQuiz2}
                      alt="upcomming Quiz 2"
                      className="w-[90%] mx-auto"
                    />
                  </div>
                  <div className="px-3 py-2 mt-auto flex-grow">
                    <h2 className="font-semibold text-lg">
                      {upcomingQuizzes[1]?.title}
                    </h2>
                    <p className="text-gray-600 text-[15px]">
                      {formatDate(upcomingQuizzes[0].schadule).split(",")[0]} |{" "}
                      {formatDate(upcomingQuizzes[0].schadule).split(",")[1]}
                    </p>
                    <div className="flex justify-between items-center font-semibold text-[14px] mt-5">
                      <p>
                        No. of students enrolled:{" "}
                        {upcomingQuizzes[1]?.participants}
                      </p>
                      <div
                        onClick={() =>
                          navigate("/dashboard/quiz-details", {
                            state: { quiz: upcomingQuizzes[0]?._id },
                          })
                        }
                        className="cursor-pointer group"
                      >
                        Open
                        <FaCircleArrowRight
                          size={18}
                          color="#C5D86D"
                          className="inline mx-1 group-hover:translate-x-1.5 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Completed Quizzes */}
        <div className="p-3 border border-gray-300 rounded-lg w-full">
          <div
            onClick={() =>
              navigate("/dashboard/students-results", {
                state: { quiz: upcomingQuizzes[0]?._id },
              })
            }
            className="cursor-pointer group flex justify-between items-center"
          >
            <h3 className="font-semibold text-lg">Completed quizzes</h3>
            <div>
              <span className="text-[14px] font-semibold">Results</span>
              <FaLongArrowAltRight
                size={18}
                color="#C5D86D"
                className="inline mx-1 group-hover:translate-x-1.5 transition-all duration-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto max-h-[67%] lg:max-h-[80%] overflow-y-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-y-2">
              <thead className="text-xs text-white capitalize bg-[#0D1321]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 font-light border-e border-white rounded-s-lg"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 font-light border-e border-white"
                  >
                    Group name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 font-light border-e border-white"
                  >
                    No. of persons in group
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 font-light border-e border-white"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {loadingCompletedQuizzes && (
                  <tr>
                    <td colSpan={6} className="">
                      <img
                        src={dataLoading}
                        alt="loading"
                        className="w-[17%]  !mx-auto"
                      />
                    </td>
                  </tr>
                )}

                {!loadingCompletedQuizzes && completedQuizzes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No completed quizzes !
                    </td>
                  </tr>
                )}

                {!loadingCompletedQuizzes &&
                  completedQuizzes?.map((quiz: QuizTypes) => (
                    <tr key={quiz?._id} className="shadow rounded-lg border">
                      <td
                        data-label="Title:"
                        className="table-data px-3 py-2 text-xs border border-gray-300 rounded-s-lg overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {quiz?.title}
                      </td>
                      <td
                        data-label="Group:"
                        className="table-data px-3 py-2 text-xs border border-gray-300 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {quiz?.group}
                      </td>
                      <td
                        data-label="Participants:"
                        className="table-data px-3 py-2 text-xs border border-gray-300"
                      >
                        {quiz?.participants} {quiz.participants == 0 && ""}{" "}
                        {quiz.participants == 1 && "person"}{" "}
                        {quiz?.participants > 1 && "persons"}
                      </td>
                      <td
                        data-label="Date:"
                        className="table-data px-3 py-2 text-xs border border-gray-300"
                      >
                        {formatDate(quiz?.schadule).split(",")[0]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

   {/* Quiz Form PopUp */}
      <FormPopUp
        isOpen={isModalOpen}
        onClose={handleCloseClick}
        onSave={handleSaveClick}
        title={formTitle}
        mode={formMode}
        content={
          <QuizPopUp mode={formMode} onSave={handleSaveQuiz} ref={formRef} />
        }
      />
    </>
  );
}
