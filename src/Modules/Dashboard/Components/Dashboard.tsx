import { useEffect, useState } from "react";
import {
  axiosInstance,
  QUIZZES_URLS,
  STUDENTS_URLS,
} from "../../../SERVICES/ENDPOINTS";

import type { QuizTypes, StudentTypes } from "../../../SERVICES/INTERFACES";
import { formatDate } from "../../../SERVICES/FORMATDATE";
import dataLoading from "../../../assets/Images/dataLoading.gif";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import img2 from "../../../assets/Images/img (2).png";
import user1 from "../../../assets/Images/user img (2).png";
import user2 from "../../../assets/Images/user img (3).png";
import user3 from "../../../assets/Images/user img (4).png";
import user4 from "../../../assets/Images/user img (5).png";
import { Link } from "react-router-dom";

const userImgs = [user1, user2, user3, user4];

export default function Dashboard() {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<QuizTypes[]>([]);
  const [topStudents, setTopStudents] = useState<StudentTypes[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const userData = useSelector(
    (state: RootState) => state.userProfileData.value
  );

  const getUpcomingQuizzes = async () => {
    setLoadingQuizzes(true);
    try {
      const response = await axiosInstance.get(QUIZZES_URLS.GET_ALL);
      setUpcomingQuizzes(response?.data?.slice(0, 5) || []);
    } catch {
      setLoadingQuizzes(false);
    } finally {
      setLoadingQuizzes(false);
    }
  };

  const getTopStudents = async () => {
    setLoadingStudents(true);
    try {
      const response = await axiosInstance.get(STUDENTS_URLS.GET_ALL);
      setTopStudents(response?.data?.slice(0, 5) || []);
    } catch {
      setLoadingStudents(false);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    getUpcomingQuizzes();
    if (userData?.role === "Instructor") {
      getTopStudents();
    }
  }, [userData?.role]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full">
      {/* Upcoming Quizzes Section */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl border border-gray-200 h-[600px] overflow-hidden shadow-sm">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming 5 quizzes
            </h2>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              <Link to="/dashboard/quizzes">Quiz directory</Link>
            </span>
          </div>

          <div className="overflow-y-auto max-h-[550px]">
            {loadingQuizzes && (
              <div className="flex justify-center items-center py-20">
                <img src={dataLoading} alt="loading" className="w-16 h-16" />
              </div>
            )}

            {!loadingQuizzes && upcomingQuizzes.length === 0 && (
              <div className="flex justify-center items-center py-20 text-gray-500">
                No upcoming quizzes found
              </div>
            )}

            {!loadingQuizzes &&
              upcomingQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src={img2} alt="" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                        {quiz.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {formatDate(quiz.schadule)}
                      </p>
                      <p className="text-xs text-gray-600">
                        No. of student's enrolled: {quiz.questions_number}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Open ●
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold `}
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Top Students Section - Only show for instructors */}
      {userData?.role === "Instructor" && (
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-200 h-[600px] overflow-hidden shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Top 5 Students
              </h2>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                <Link to="/dashboard/students">All Students</Link>
              </span>
            </div>

            <div className="overflow-y-auto max-h-[550px]">
              {loadingStudents && (
                <div className="flex justify-center items-center py-20">
                  <img src={dataLoading} alt="loading" className="w-16 h-16" />
                </div>
              )}

              {!loadingStudents && topStudents.length === 0 && (
                <div className="flex justify-center items-center py-20 text-gray-500">
                  No students found
                </div>
              )}

              {!loadingStudents &&
                topStudents.map((student, index) => (
                  <div
                    key={student._id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-15 h-15 flex items-center justify-center flex-shrink-0 text-white font-semibold `}
                      >
                        <img
                          src={userImgs[index % userImgs.length]}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
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

                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
