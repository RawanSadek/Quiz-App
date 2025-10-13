import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiHome6Line } from "react-icons/ri";
import { TbFileLike, TbMessageQuestion } from "react-icons/tb";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/Store";
import { IoMdMenu } from "react-icons/io";
import logo from "../../../../assets/Images/Logo icon.png";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrDocumentTime } from "react-icons/gr";
import { TfiHelpAlt } from "react-icons/tfi";

export default function SideBar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const userData = useSelector(
    (state: RootState) => state.userProfileData.value
  );

  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop(); // Get the last part of the path

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 795);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <Sidebar collapsed={collapsed} className="h-full ">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="py-4 flex justify-evenly items-center border-b-2 border-gray-200">
          <IoMdMenu
            onClick={() => setCollapsed(!collapsed)}
            size={34}
            className="cursor-pointer hover:text-gray-700"
            aria-label="Toggle sidebar"
          />
          <img hidden={collapsed} src={logo} alt="logo" />
        </div>
        <Menu>
          <MenuItem
            component={<Link to="/dashboard" />}
            className={`${
              currentPage?.includes("dashboard")
                ? "border-e-4 border-e-black"
                : ""
            } text-black border-b-2 border-gray-200 font-semibold`}
          >
            {" "}
            <RiHome6Line
              className={`${
                currentPage?.includes("dashboard")
                  ? "bg-black text-[#FFEDDF]"
                  : "bg-[#FFEDDF]"
              } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
            />
            Dashboard
          </MenuItem>
          {userData?.role == "Instructor" && (
            <MenuItem
              component={<Link to="/dashboard/students" />}
              className={`${
                currentPage?.includes("students")
                  ? "border-e-4 border-e-black"
                  : ""
              } text-black border-b-2 border-gray-200 font-semibold`}
            >
              {" "}
              <HiOutlineUserGroup
                className={`${
                  currentPage?.includes("students")
                    ? "bg-black text-[#FFEDDF]"
                    : "bg-[#FFEDDF]"
                } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
              />
              Students
            </MenuItem>
          )}
          {userData?.role == "Instructor" && (
            <MenuItem
              component={<Link to="/dashboard/groups" />}
              className={`${
                currentPage?.includes("groups")
                  ? "border-e-4 border-e-black"
                  : ""
              } text-black border-b-2 border-gray-200 font-semibold`}
            >
              {" "}
              <HiOutlineUserGroup
                className={`${
                  currentPage?.includes("groups")
                    ? "bg-black text-[#FFEDDF]"
                    : "bg-[#FFEDDF]"
                } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
              />
              Groups
            </MenuItem>
          )}
          {userData?.role == "Instructor" && (
            <MenuItem
              component={<Link to="/dashboard/questions" />}
              className={`${
                currentPage?.includes("question")
                  ? "border-e-4 border-e-black"
                  : ""
              } text-black border-b-2 border-gray-200 font-semibold`}
            >
              {" "}
              <TbMessageQuestion
                className={`${
                  currentPage?.includes("question")
                    ? "bg-black text-[#FFEDDF]"
                    : "bg-[#FFEDDF]"
                } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
              />
              Questions
            </MenuItem>
          )}
          <MenuItem
            component={<Link to="/dashboard/quizzes" />}
            className={`${
              currentPage?.includes("quiz") ? "border-e-4 border-e-black" : ""
            } text-black border-b-2 border-gray-200 font-semibold`}
          >
            {" "}
            <GrDocumentTime
              className={`${
                currentPage?.includes("quiz")
                  ? "bg-black text-[#FFEDDF]"
                  : "bg-[#FFEDDF]"
              } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
            />
            Quizzes
          </MenuItem>
          <MenuItem
            component={
              <Link
                to={`${
                  userData?.role == "Instructor"
                    ? "/dashboard/students-results"
                    : "/dashboard/my-results"
                }`}
              />
            }
            className={`${
              currentPage?.includes("result") ? "border-e-4 border-e-black" : ""
            } text-black border-b-2 border-gray-200 font-semibold`}
          >
            {" "}
            <TbFileLike
              className={`${
                currentPage?.includes("result")
                  ? "bg-black text-[#FFEDDF]"
                  : "bg-[#FFEDDF]"
              } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
            />
            Results
          </MenuItem>
        </Menu>

        <div className="mt-auto" />

        {/* Bottom Menu (Help) */}
        <Menu>
          <MenuItem
            component={<Link to="#" />}
            className={`${
              currentPage?.includes("#") ? "border-e-4 border-e-black" : ""
            } text-black border-t-2 border-gray-200 font-semibold`}
          >
            <TfiHelpAlt
              className={`${
                currentPage?.includes("#")
                  ? "bg-black text-[#FFEDDF]"
                  : "bg-[#FFEDDF]"
              } rounded-lg p-1 text-4xl inline !me-4 !mb-2 transition-all duration-250`}
            />
            Help
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
}
