import { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { axiosInstance, QUESTIONS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { QuestionTypes } from "../../../SERVICES/INTERFACES";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await axiosInstance(QUESTIONS_URLS.GET_ALL);
      setQuestions(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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
          /*onClick={open set up quiz pop up}*/ className="relative inline-flex px-4 py-1 justify-center items-center cursor-pointer text-md rounded-full border border-gray-400 me-4 hover:bg-gray-100"
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
                <td data-label="Question Title:" className="table-data px-3 py-2 text-xs border border-gray-300 rounded-s-lg">
                  {question.title}
                </td>
                <td data-label="Question Desc:" className="table-data px-3 py-2 text-xs border border-gray-300">
                  {question.description}
                </td>
                <td data-label="Difficulty Level:" className="table-data px-3 py-2 text-xs border border-gray-300">
                  {question.difficulty}
                </td>
                <td data-label="Type:" className="table-data px-3 py-2 text-xs border border-gray-300">
                  {question.type}
                </td>
                <td className="px-3 py-2 border border-gray-300 rounded-e-lg flex justify-between items-center text-lg">
                  <div className="relative group">
                    <FaEye className="cursor-pointer text-xl text-[#C5D86D]" />
                    <div
                      className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                  hidden group-hover:block bg-black text-white text-sm
                  px-3 py-1 rounded-md shadow-lg "
                    >
                      View
                    </div>
                  </div>

                  <div className="relative group">
                    <FaRegEdit className="cursor-pointer text-xl text-[#C5D86D]" />
                    <div
                      className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                  hidden group-hover:block bg-black text-white text-sm
                  px-3 py-1 rounded-md shadow-lg "
                    >
                      Edit
                    </div>
                  </div>

                  <div className="relative group">
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
    </div>
  );
}
