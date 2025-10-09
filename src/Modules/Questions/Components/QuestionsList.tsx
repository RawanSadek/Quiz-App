import { useEffect, useRef, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { axiosInstance, QUESTIONS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { QuestionTypes } from "../../../SERVICES/INTERFACES";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import FormPopUp from "../../Shared/Components/FormPopUp/FormPopUp";
import QuestionData from "./QuestionForm";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const formRef = useRef<{ saveForm: () => void }>(null);

  const getQuestions = async () => {
    try {
      const response = await axiosInstance(QUESTIONS_URLS.GET_ALL);
      setQuestions(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleConfirmDelete = async () => {
    if (targetId == null) return;
    try {
      const response = await axiosInstance.delete(
        QUESTIONS_URLS.DELETE_QUESTION(targetId)
      );
      toast.success(response?.data?.message || "Question Deleted Successfully");
      getQuestions();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsDeleteModalOpen(false);
      setTargetId(null);
    }
  };

  const handleOpenQuestionForm = (
    title: string,
    mode: "add" | "edit" | "view"
  ) => {
    setFormMode(mode);
    setFormTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
    setTargetId(null);
  };

  const handleSaveClick = () => {
    formRef.current?.saveForm();
    handleCloseClick();
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="border-2 border-[#dedede] py-3 px-5 rounded-lg h-[570px] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bank Of Questions</h2>
        <div
          onClick={() => handleOpenQuestionForm("Set up a new question", "add")}
          className="relative inline-flex px-4 py-1 justify-center items-center cursor-pointer text-md rounded-full border border-gray-400 me-4 hover:bg-gray-100"
        >
          <MdOutlineAddCircle className="text-[26px] cursor-pointer me-1" />
          <p className="font-semibold">Add Question</p>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-3 max-h-[90%] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-y-2">
          <thead className="text-xs text-white capitalize bg-[#0D1321]">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 font-light border-e border-white rounded-s-lg"
              >
                question title
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-light border-e border-white"
              >
                question desc
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-light border-e border-white"
              >
                question difficulty level
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-light border-e border-white"
              >
                type
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-light border-s border-white rounded-e-lg"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody className="text-black">
            {questions?.map((question: QuestionTypes) => (
              <tr key={question._id} className="shadow rounded-lg border">
                <td
                  data-label="Question Title:"
                  className="table-data px-3 py-2 text-xs border border-gray-300 rounded-s-lg"
                >
                  {question.title}
                </td>
                <td
                  data-label="Question Desc:"
                  className="table-data px-3 py-2 text-xs border border-gray-300"
                >
                  {question.description}
                </td>
                <td
                  data-label="Difficulty Level:"
                  className="table-data px-3 py-2 text-xs border border-gray-300"
                >
                  {question.difficulty}
                </td>
                <td
                  data-label="Type:"
                  className="table-data px-3 py-2 text-xs border border-gray-300"
                >
                  {question.type}
                </td>
                <td className="px-3 py-2 border border-gray-300 rounded-e-lg flex justify-between items-center text-lg">
                  <div
                    onClick={() => {
                      setTargetId(question?._id ?? null);
                      handleOpenQuestionForm("View question details", "view");
                    }}
                    className="relative group"
                  >
                    <FaEye className="cursor-pointer text-xl text-[#C5D86D]" />
                    <div
                      className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                  hidden group-hover:block bg-black text-white text-sm
                  px-3 py-1 rounded-md shadow-lg "
                    >
                      View
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setTargetId(question?._id ?? null);
                      handleOpenQuestionForm("Update question", "edit");
                    }}
                    className="relative group"
                  >
                    <FaRegEdit className="cursor-pointer text-xl text-[#C5D86D]" />
                    <div
                      className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                  hidden group-hover:block bg-black text-white text-sm
                  px-3 py-1 rounded-md shadow-lg "
                    >
                      Edit
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setTargetId(question?._id ?? null);
                      setIsDeleteModalOpen(true);
                    }}
                    className="relative group"
                  >
                    <RiDeleteBin6Line className="cursor-pointer text-xl text-[#C5D86D]" />
                    <div
                      className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                  hidden group-hover:block bg-black text-white text-sm
                  px-3 py-1 rounded-md shadow-lg "
                    >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation  */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        entity="question"
      />

      {/* Form PopUp */}
      <FormPopUp
        isOpen={isModalOpen}
        onClose={handleCloseClick}
        onSave={handleSaveClick}
        title={formTitle}
        mode={formMode}
        content={<QuestionData id={targetId?? null} mode={formMode} ref={formRef} />}
      />
    </div>
  );
}
