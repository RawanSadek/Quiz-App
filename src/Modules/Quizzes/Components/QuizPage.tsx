import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { QuizTypes } from "../../../SERVICES/INTERFACES";
import { axiosInstance, QUIZZES_URLS } from "../../../SERVICES/ENDPOINTS";
import { CgSandClock } from "react-icons/cg";
import dataLoading from "../../../assets/Images/loadingData.gif";

export default function QuizPage() {
  const { quizId } = useParams();

  const [quizDetails, setQuizDetails] = useState<QuizTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const getQuizById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance(
        QUIZZES_URLS.QUESTIONS_WITHOUT_ANSWERS(quizId!)
      );
      setQuizDetails(response?.data?.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return false;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!quizDetails?.schadule || !quizDetails?.duration) return;

    const startTime = new Date(quizDetails.schadule).getTime();
    const endTime = startTime + quizDetails.duration * 60 * 1000; // duration in minutes

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = endTime - now;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        // Optional: auto-submit the quiz or disable answers
        // handleSubmitQuiz();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizDetails]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    getQuizById();
  }, []);

  return (
    <>
      {(loading || !timeLeft) && (
        <div className="absolute flex justify-center items-center py-20 bg-gray-50 w-fit h-fit z-[9999999]">
          <img src={dataLoading} alt="loading" className="w-[15%]  !mx-auto" />
        </div>
      )}

      {!loading && (
        <div className="p-4">
          {/* Timer display */}
          <div className="mt-4 text-lg font-semibold text-gray-800">
            {timeLeft! > 0 ? (
              <p>
                <CgSandClock color="green" size={30} className="inline-block" />{" "}
                Time left: {formatTime(timeLeft!)}
              </p>
            ) : (
              <p className="text-red-600">⏰ Time’s up!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
