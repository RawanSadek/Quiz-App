import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <div className="flex h-screen">
      <div className="h-full">
        <SideBar />
      </div>

      <div className="flex flex-col min-h-screen w-full">
        <div>
          <Navbar />
        </div>

        <div className="flex-grow p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
