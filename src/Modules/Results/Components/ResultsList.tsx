import { useEffect, useMemo, useState } from "react";
import { axiosInstance, RESULTS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { ResultTypes } from "../../../SERVICES/INTERFACES";
import { FaEye } from "react-icons/fa";
import dataLoading from "../../../assets/Images/loadingData.gif";
import { formatDate } from "../../../SERVICES/FORMATDATE";
import { useNavigate } from "react-router-dom";

export default function ResultsList() {
  const [results, setResult] = useState<
    { quiz: ResultTypes; participants: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return results.slice(start, end);
  }, [results, page, pageSize]);
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);
  const getResult = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance(RESULTS_URLS.GET_ALL);
      setResult(response?.data);
      setPage(1);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getResult();
  }, []);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const onChangePageSize = (n: number) => {
    setPageSize(n);
    setPage(1);
  };

  const startIdx = total ? (page - 1) * pageSize + 1 : 0;
  const endIdx = (page - 1) * pageSize + pageRows.length;
  const handleResultDetails = () => {
    navigate("/dashboard/quiz-result-details");
  };
  return (
    <>
      <div className="border-2 border-[#dedede] py-3 px-5 rounded-lg h-[570px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center py-2">
          <div className="flex justify-between font-semibold">
            <h2 className="text-xl font-semibold">Completed Quizzes</h2>
          </div>
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => onChangePageSize(Number(e.target.value))}
            >
              {[5, 10, 12, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto mt-3 max-h-[90%] overflow-y-auto ">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 border-separate border-spacing-y-2 ">
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
                  Number Of Question
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-light border-e border-white"
                >
                  Difficulty
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-light border-e border-white"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-light border-e border-white"
                >
                  Closed At
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
              {loading && (
                <tr>
                  <td colSpan={6} className="!py-10">
                    <img
                      src={dataLoading}
                      alt="loading"
                      className="w-[15%]] !mt-3 !mx-auto"
                    />
                  </td>
                </tr>
              )}

              {!loading && pageRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-400">
                    No results found
                  </td>
                </tr>
              )}

              {!loading &&
                pageRows.map((item) => (
                  <tr key={item.quiz._id} className="shadow rounded-lg border">
                    <td className="table-data px-3 py-2 text-xs border border-gray-300 rounded-s-lg">
                      {item.quiz.title}
                    </td>
                    <td className="table-data px-3 py-2 text-xs border border-gray-300">
                      {item.quiz.questions_number}
                    </td>
                    <td className="table-data px-3 py-2 text-xs border border-gray-300">
                      {item.quiz.difficulty}
                    </td>
                    <td className="table-data px-3 py-2 text-xs border border-gray-300">
                      {item.quiz.type}
                    </td>
                    <td className="table-data px-3 py-2 text-xs border border-gray-300">
                      {formatDate(item?.quiz?.closed_at)}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 rounded-e-lg flex justify-center items-center text-lg">
                      <div className="relative group">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResultDetails();
                          }}
                          className="cursor-pointer"
                          aria-label="View result details"
                        >
                          <FaEye className="text-xl text-[#C5D86D]" />
                        </button>

                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg">
                          View
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination bar */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-500">
          Page <b>{page}</b> of <b>{totalPages}</b> • Showing{" "}
          <b>
            {startIdx}–{endIdx}
          </b>{" "}
          of <b>{total}</b>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!canPrev}
          >
            Prev
          </button>

          {totalPages <= 7 && (
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 border rounded ${
                    n === page ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={!canNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
