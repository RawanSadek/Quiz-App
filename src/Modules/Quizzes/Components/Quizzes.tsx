import { BiSolidAlarmAdd } from "react-icons/bi";
import { CiVault } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Quizzes() {
  return (
    <div className="flex flec-col lg:flex-row justify-between items-center gap-8">
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        {/* Set up new quiz */}
        <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-400 min-w-[190px]">
          <BiSolidAlarmAdd className="text-[55px] mx-auto" />
          <h3 className="text-lg font-semibold">Set up a new quiz</h3>
        </div>
        
        {/* Questions bank */}
        <Link to='/dashboard/questions' className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-400 min-w-[190px]">
          <CiVault className="text-[55px] mx-auto" />
          <h3 className="text-lg font-semibold">Question Bank</h3>
        </Link>
      </div>

      <div className="flex flex-col justify-between items-center flex-grow gap-3">
        {/* Upcomming Quizzes */}
        <div className="flex flex-col justify-between items-center gap-3 py-5 px-3 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-lg">Upcomming quizzes</h3>
        </div>
      </div>
    </div>
  )
}
