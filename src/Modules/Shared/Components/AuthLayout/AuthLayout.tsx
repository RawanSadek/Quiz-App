import { Outlet } from "react-router-dom";
import authImg from "../../../../assets/Images/auth-image.png";
import logo from "../../../../assets/Images/logo.png";

export default function AuthLayout() {
  return (
    <div className="bg-[#0D1321] w-screen min-h-screen flex flex-col lg:flex-row justify-between p-8 pe-10 text-white">
      <div className="flex flex-col justify-between h-full lg:w-[47%]">
        <div className="flex justify-start">
          <img src={logo} alt="logo" className="w-50 mt-3" />
        </div>
        <div className="flex-grow flex items-center">
          <Outlet />
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 lg:mt-0 lg:w-[47%]">
        <img
          src={authImg}
          alt="auth img"
          className="h-full w-full object-contain "
        />
      </div>
    </div>
  );
}
