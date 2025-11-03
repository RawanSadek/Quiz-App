import { useEffect, useState } from "react";
import { axiosInstance, STUDENTS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { StudentTypes } from "../../../SERVICES/INTERFACES";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import dataLoading from "../../../assets/Images/loadingData.gif";
import { FaEye } from "react-icons/fa";

export default function StudentsList() {
  const [students, setStudents] = useState<StudentTypes[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number>(1);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const groups = [
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
  ];

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(STUDENTS_URLS.GET_ALL);
      setStudents(response?.data || []);
    } catch {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (targetId == null) return;
    try {
      const response = await axiosInstance.delete(
        STUDENTS_URLS.DELETE_STUDENT(targetId)
      );
      toast.success(response?.data?.message || "Student Deleted Successfully");
      getStudents();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsDeleteModalOpen(false);
      setTargetId(null);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Pagination calculations
  const totalStudents = students.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  // Create two columns from current page students
  const midPoint = Math.ceil(currentStudents.length / 2);
  const leftColumnStudents = currentStudents.slice(0, midPoint);
  const rightColumnStudents = currentStudents.slice(midPoint);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Students list</h2>
      </div>

      {/* Group Tabs */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex gap-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGroup === group.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Students Grid */}
      <div className="p-6">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <img src={dataLoading} alt="loading" className="w-[15%]" />
          </div>
        )}

        {!loading && students.length === 0 && (
          <div className="flex justify-center items-center py-20 text-gray-500">
            No students found
          </div>
        )}

        {!loading && students.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              {leftColumnStudents.map((student, index) => (
                <div
                  key={student._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      index % 4 === 0
                        ? "bg-blue-500"
                        : index % 4 === 1
                        ? "bg-orange-500"
                        : index % 4 === 2
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  >
                    <span className="text-sm">
                      {student.first_name?.charAt(0)}
                      {student.last_name?.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {student.first_name} {student.last_name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>
                        Class rank: {student.rank || index + 1}
                        {(student.rank || index + 1) === 1
                          ? "st"
                          : (student.rank || index + 1) === 2
                          ? "nd"
                          : (student.rank || index + 1) === 3
                          ? "rd"
                          : "th"}
                      </span>
                      <span>|</span>
                      <span>
                        Average score:{" "}
                        {student.avg_score ||
                          Math.floor(Math.random() * 40 + 60)}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEye className="cursor-pointer text-xl" />

                    <button
                      onClick={() => {
                        setTargetId(student._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-50 transition-colors group"
                      title="Delete student"
                    >
                      <RiDeleteBin6Line className="cursor-pointer text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {rightColumnStudents.map((student, index) => (
                <div
                  key={student._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      (index + midPoint) % 4 === 0
                        ? "bg-blue-500"
                        : (index + midPoint) % 4 === 1
                        ? "bg-orange-500"
                        : (index + midPoint) % 4 === 2
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  >
                    <span className="text-sm">
                      {student.first_name?.charAt(0)}
                      {student.last_name?.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {student.first_name} {student.last_name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>
                        Class rank: {student.rank || index + midPoint + 1}
                        {(student.rank || index + midPoint + 1) === 1
                          ? "st"
                          : (student.rank || index + midPoint + 1) === 2
                          ? "nd"
                          : (student.rank || index + midPoint + 1) === 3
                          ? "rd"
                          : "th"}
                      </span>
                      <span>|</span>
                      <span>
                        Average score:{" "}
                        {student.avg_score ||
                          Math.floor(Math.random() * 40 + 60)}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEye className="cursor-pointer text-xl" />
                    <button
                      onClick={() => {
                        setTargetId(student._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-50 transition-colors group"
                      title="Delete student"
                    >
                      <RiDeleteBin6Line className="cursor-pointer text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalStudents > studentsPerPage && (
          <div className="flex justify-center items-center mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {typeof page === "number" ? (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                        currentPage === page
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span className="px-2">...</span>
                  )}
                </span>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Pagination info */}
        {!loading && totalStudents > 0 && (
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalStudents)} of{" "}
              {totalStudents} students
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        entity="student"
      />
    </div>
  );
}
