import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../../Redux/Store";
import { logout } from "../../../Redux/UserDataSlice";

export default function Navbar() {

  const userData = useSelector((state: RootState) => state.userProfileData.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div>
      <h2>welcome {userData?.first_name} {userData?.last_name}</h2>
      <button className="border bg-blue-600"><Link to='/change-password'>change</Link></button> <br />
      <button className="border bg-gray-200 cursor-pointer" onClick={()=>{dispatch(logout()); navigate('/login')}}>logout</button>
    </div>
  )
}
