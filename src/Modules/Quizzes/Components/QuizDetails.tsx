import { useLocation } from "react-router-dom";

export default function QuizDetails() {
  const location = useLocation();
  const { quiz } = location.state || {};
  // console.log(quiz);
  return (
    <div>
      QuizDetails
    </div>
  )
}
