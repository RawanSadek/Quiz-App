import { Outlet } from "react-router-dom";
import authImg from "../../../../assets/Images/auth-image.png";
import logo from "../../../../assets/Images/logo.png";

export default function AuthLayout() {
  return (
    <div className="bg-[#0D1321] w-screen h-screen flex justify-between items-center py-5 px-8 text-white">

      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-start">
          <img src={logo} alt="logo" className="w-50 mt-3" />
        </div>
        <div className="flex-grow flex items-center">
          <Outlet />
        </div>
      </div>

      <div className="flex items-center justify-center h-full">
        <img src={authImg} alt="auth img" className="max-h-full" />
      </div>
    </div>
  );
}
