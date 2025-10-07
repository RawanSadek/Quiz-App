import { FaBell, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLogoutBoxFill, RiProfileFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Redux/Store";
import { logout } from "../../../Redux/UserDataSlice";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

export default function Navbar() {
  const userData = useSelector(
    (state: RootState) => state.userProfileData.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop(); // Get the last part of the path

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="relative py-5 sm:py-0 px-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 shadow-sm">
      <div className="relative flex items-center justify-between">
        <div className="items-center py-0.5">
          <h3 className="capitalize font-semibold">{currentPage}</h3>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* large screens */}
          <div className="hidden sm:flex items-center justify-between">
            {userData?.role === "Instructor" && (
              <div
                /*onClick={open set up quiz pop up}*/ className="relative inline-flex px-4 py-1 justify-center items-center cursor-pointer text-md rounded-full border border-gray-400 me-4 hover:bg-gray-100"
              >
                <BiSolidAlarmAdd className="text-[26px] cursor-pointer me-1" />
                <p className="font-semibold">New Quiz</p>
              </div>
            )}

            {userData?.role === "Student" && (
              <div
                onClick={() => navigate("/dashboard/quiz-details")}
                className="relative inline-flex px-4 py-1 justify-center items-center cursor-pointer text-md rounded-full border border-gray-400 me-4 hover:bg-gray-100"
              >
                <BiSolidAlarmAdd className="text-[26px] cursor-pointer me-1" />
                <p className="font-semibold">Join Quiz</p>
              </div>
            )}

            {userData?.role === "Student" && (
              <div>
                <div className="relative inline-flex px-7 justify-center items-center py-5 border-s-2 border-gray-300 cursor-pointer">
                  <MdEmail className="text-[27px] cursor-pointer" />
                  <span className="absolute top-4 left-12 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ffeddf] text-[12px] text-black font-bold">
                    0
                  </span>
                </div>

                <div className="relative inline-flex px-7 justify-center items-center py-5 border-s-2 border-gray-300 cursor-pointer">
                  <FaBell className="text-2xl cursor-pointer" />
                  <span className="absolute top-3 left-10 grid min-h-[18px] min-w-[18px]  place-items-center rounded-full bg-[#ffeddf] text-[12px] text-black font-bold">
                    0
                  </span>
                </div>
              </div>
            )}

            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex justify-between items-center py-3 gap-2 border-s-2 border-gray-300 !px-7 cursor-pointer"
            >
              <div className="flex justify-between items-center gap-5">
                <div className="flex flex-col me-10">
                  <h5 className="font-semibold">
                    {userData?.first_name} {userData?.last_name}
                  </h5>
                  <small className="text-[#C5D86D] font-semibold">
                    {userData?.role}
                  </small>
                </div>

                {profileOpen ? (
                  <FaChevronUp className="text-gray-300 text-xl" />
                ) : (
                  <FaChevronDown className="text-gray-300 text-xl" />
                )}
              </div>
            </div>

            {/* drop down list */}
            {profileOpen && (
              <div className="absolute right-0 top-[100%] w-48 origin-top-right bg-white py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-50">
                <Link
                  to="my-profile"
                  className="w-full font-semibold flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#c4d86da0]"
                >
                  <RiProfileFill className="text-lg" />
                  My Profile
                </Link>
                <Link
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                  to="/login"
                  className="w-full flex items-center gap-2 !px-4 !py-2 text-sm font-semibold hover:bg-[#c4d86da0]"
                >
                  <RiLogoutBoxFill className="text-lg" />
                  Sign out
                </Link>
              </div>
            )}
          </div>

          {/* small screens */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[#104137] hover:text-[#0e382fb7] focus:outline-2 focus:-outline-offset-1 focus:outline-[#0E382F]"
            >
              {menuOpen ? (
                <IoMdClose className="text-3xl text-[#104137]" />
              ) : (
                <BsList className="text-3xl text-[#104137]" />
              )}
            </button>

            {/* drop down list */}
            {menuOpen && (
              <div className="absolute right-0 !mt-2 w-64 bg-white shadow-lg z-50">
                <div className="flex items-center gap-3 !p-4 border-b border-gray-200">
                  <div className="flex flex-col">
                    <h5 className="font-medium text-gray-900">
                      {userData?.first_name} {userData?.last_name}
                    </h5>
                    <small className="text-[#C5D86D] font-semibold">
                      {userData?.role}
                    </small>
                  </div>
                </div>

                <div className="py-2">
                  {userData?.role === "Student" && (
                    <div>
                      <Link
                        to=""
                        className="relative w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#c4d86da0]"
                      >
                        <MdEmail className="text-xl cursor-pointer" />
                        <span className="absolute top-[3px] left-7 grid min-h-[14px] min-w-[14px] place-items-center rounded-full bg-[#ffeddf] text-[10px] text-black font-bold">
                          0
                        </span>
                        <p className="font-semibold">Mails</p>
                      </Link>

                      <Link
                        to=""
                        className="relative w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#c4d86da0]"
                      >
                        <FaBell className="text-xl cursor-pointer" />
                        <span className="absolute top-[3px] left-7 grid min-h-[14px] min-w-[14px] place-items-center rounded-full bg-[#ffeddf] text-[10px] text-black font-bold">
                          0
                        </span>
                        <p className="font-semibold">Notifications</p>
                      </Link>
                    </div>
                  )}

                  <Link
                    to="my-profile"
                    className="w-full font-semibold flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#c4d86da0]"
                  >
                    <RiProfileFill className="text-lg" />
                    My Profile
                  </Link>

                  <Link
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    to="/login"
                    className="w-full flex items-center font-semibold gap-2 !px-4 !py-2 text-sm hover:bg-[#c4d86da0]"
                  >
                    <RiLogoutBoxFill className="text-lg" />
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
