import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      
      <div className="flex flex-grow">
        <div className="w-[20%] bg-red-300">
          <SideBar />
        </div>

        <div className="w-[80%] bg-blue-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
