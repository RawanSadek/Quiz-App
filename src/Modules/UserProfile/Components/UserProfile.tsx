import { Link } from "react-router-dom";

export default function UserProfile() {
  return (
    <div>
      <Link
        to="/change-password"
        className="text-black bg-green-800"
      >
        Change Password
      </Link>
    </div>
  );
}
