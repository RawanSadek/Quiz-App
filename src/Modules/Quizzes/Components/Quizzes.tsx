import { BiSolidAlarmAdd } from "react-icons/bi";
import { CiVault } from "react-icons/ci";
import { Link } from "react-router-dom";
import { axiosInstance, QUIZZES_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { QuizFormData } from "../../../SERVICES/INTERFACES";
import FormPopUp from "../../Shared/Components/FormPopUp/FormPopUp";
import QuizPopUp from "./QuizPopUp";
import { useRef, useState } from "react";

export default function Quizzes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const formRef = useRef<{ submitForm: () => Promise<boolean> }>(null);

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

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
          {/* Set up new quiz */}
          <div
            onClick={() => handleOpenQuizForm("Set up a new quiz", "add")}
            className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-400 min-w-[190px]"
          >
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

        <div className="flex flex-col justify-between items-center flex-grow gap-3">
          {/* Upcomming Quizzes */}
          <div className="flex flex-col justify-between items-center gap-3 py-5 px-3 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg">Upcoming quizzes</h3>
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
