import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <button><Link to='/change-password'>change</Link></button> <br />
      <button><Link to='/login'>logout</Link></button>
    </div>
  )
}
