import { Outlet } from "react-router-dom";
import authImg from "../../../../assets/Images/auth-image.png";
import logo from "../../../../assets/Images/logo.png";

export default function AuthLayout() {
  return (
    <div className="bg-[#0D1321] w-screen min-h-screen lg:h-screen flex flex-col lg:flex-row justify-between items-center p-8 text-white">

      <div className="flex flex-col justify-between h-full lg:w-[47%]">
        <div className="flex justify-start">
          <img src={logo} alt="logo" className="w-50 mt-3" />
        </div>
        <div className="flex-grow flex items-center">
          <Outlet />
        </div>
      </div>

      <div className="flex items-center justify-center h-full mt-10 lg:mt-0 w-[100%] lg:w-1/2">
        <img src={authImg} alt="auth img" className="w-[90%] max-h-full" />
      </div>
    </div>
  );
}
