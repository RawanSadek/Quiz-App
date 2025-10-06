import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-[20%] bg-green-400">
        <SideBar />
      </div>

      <div className="flex flex-col min-h-screen w-[80%]">
        <div>
          <Navbar />
        </div>

        <div className="bg-blue-300 flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
