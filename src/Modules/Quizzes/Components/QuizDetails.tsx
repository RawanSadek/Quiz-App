import { useLocation } from "react-router-dom";
import { axiosInstance, QUIZZES_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import type { QuizFormData, QuizTypes } from "../../../SERVICES/INTERFACES";
import { FaAngleDoubleRight, FaCalendarAlt, FaClock } from "react-icons/fa";
import { formatDate } from "../../../SERVICES/FORMATDATE";
import dataLoading from "../../../assets/Images/loadingData.gif";
import { MdEdit } from "react-icons/md";
import FormPopUp from "../../Shared/Components/FormPopUp/FormPopUp";
import QuizPopUp from "./QuizPopUp";

export default function QuizDetails() {
  const location = useLocation();
  const { quizId } = location.state;

  const [quizDetails, setQuizDetails] = useState<QuizTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef<{ submitForm: () => Promise<boolean> }>(null);
  

  const getQuizById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance(QUIZZES_URLS.GET_BY_ID(quizId));
      setQuizDetails(response?.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return false;
    }
    setLoading(false);
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
        };
  
        const response = await axiosInstance.put(
          QUIZZES_URLS.UPDATE_QUIZ(quizId),
          quizData
        );
        toast.success(response?.data?.message || "Quiz updated successfully");
        return true;
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err?.response?.data?.message || "Something went wrong!");
        return false;
      }
    };

  useEffect(() => {
    getQuizById();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full h-full ">
          <img
            src={dataLoading}
            alt="loading"
            className="w-[30%] lg:w-[15%] mt-[8%] !mx-auto"
          />
        </div>
      )}
      {!loading && (
        <>
          <div>
            <p>
              Quizzes{" "}
              <FaAngleDoubleRight color={"#C5D86D"} className="inline" />{" "}
              {quizDetails?.title}
            </p>
          </div>
          <div className="flex justify-center lg:justify-start items-center w-full my-8">
            <div className="w-full lg:w-1/2 border-2 border-gray-300 rounded-lg p-4">
              <h2 className="font-bold text-2xl">{quizDetails?.title}</h2>
              <div className="flex justify-between items-center gap-5 w-fit my-3">
                <div className="flex justifybetween items-center gap-2">
                  <FaCalendarAlt />
                  {formatDate(quizDetails?.schadule).split(",")[0]}
                </div>
                <div className="flex justifybetween items-center gap-2">
                  <FaClock />
                  {formatDate(quizDetails?.schadule).split(",")[1]}
                </div>
              </div>

              <form>
                {/* Duration */}
                <div className="flex justify-start items-center gap-3 border border-gray-400 rounded-lg pe-3 mt-3">
                  <label
                    htmlFor="duration"
                    className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap"
                  >
                    Duration:
                  </label>
                  <input
                    disabled
                    defaultValue={`${quizDetails?.duration} minutes`}
                    type="text"
                    id="duration"
                    className="w-full focus:outline-0"
                  />
                </div>

                {/* No. of questions */}
                <div className="flex justify-start items-stretch gap-3 border border-gray-400 rounded-lg mt-2">
                  <label
                    htmlFor="questions-Number"
                    className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap flex items-center"
                  >
                    Number of questions:
                  </label>
                  <input
                    disabled
                    defaultValue={quizDetails?.questions_number}
                    type="text"
                    id="questions-number"
                    className="w-full focus:outline-0"
                  />
                </div>

                {/* Score per question */}
                <div className="flex justify-start items-stretch gap-3 border border-gray-400 rounded-lg mt-2">
                  <label
                    htmlFor="score"
                    className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap flex items-center"
                  >
                    Score per question:
                  </label>
                  <input
                    disabled
                    defaultValue={quizDetails?.score_per_question}
                    type="text"
                    id="score"
                    className="w-full focus:outline-0"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col justify-start items-stretch border border-gray-400 rounded-lg mt-2">
                  <label
                    htmlFor="description"
                    className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap flex items-center"
                  >
                    Description:
                  </label>
                  <input
                    disabled
                    defaultValue={
                      quizDetails?.description
                        ? quizDetails?.description
                        : "No description found !"
                    }
                    type="text"
                    id="description"
                    className={`w-full focus:outline-0 p-3 ${
                      quizDetails?.description
                        ? ""
                        : "text-gray-400 text-center"
                    }`}
                  />
                </div>

                {/* Question bank */}
                <div className="flex justify-start items-stretch gap-3 border border-gray-400 rounded-lg pe-3 mt-3">
                  <label
                    htmlFor="questionBank"
                    className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap flex items-center"
                  >
                    Question bank used:
                  </label>
                  <input
                    disabled
                    defaultValue={`${
                      quizDetails?.questions[0]?.title
                        ? quizDetails?.questions[0]?.title
                        : "No question bank found !"
                    }`}
                    type="text"
                    id="questionBank"
                    className={`w-full focus:outline-0 p-3 ${
                      quizDetails?.questions[0]?.title ? "" : "text-gray-400"
                    }`}
                  />
                </div>

                {/* Randomize */}
                <div className="flex justify-start items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    checked
                    className="mr-2 w-3 h-3 lg:w-4 lg:h-4 rounded accent-black"
                  />
                  <span className="text-gray-800 font-semibold">
                    Randomize questions
                  </span>
                </div>

                <div className="w-full flex justify-end">
                  <div
                    onClick={() =>
                      handleOpenQuizForm("Update quiz details", "edit")
                    }
                    className="px-5 py-0.5 flex justify-center items-center gap-1 rounded-lg bg-black text-white hover:scale-110 transition-all duration-500 cursor-pointer"
                  >
                    <MdEdit /> <span className="font-semibold">Edit</span>
                  </div>
                </div>
              </form>
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
          <QuizPopUp mode={formMode} onSave={handleSaveQuiz} ref={formRef} quizData={quizDetails!} />
        }
      />
        </>
      )}
    </>
  );
}
