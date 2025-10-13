import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed h-full transition-all duration-300 ${collapsed ? "w-20" : "w-[250px]"}`}>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        className={`flex flex-col min-h-screen w-full transition-all duration-300 ${collapsed ? "ml-20" : "ml-[250px]"}`}>
        <Navbar />
        <div className="flex-grow p-7 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
