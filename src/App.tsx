import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import Login from "./Modules/AuthModule/Components/Login/Login";
import Register from "./Modules/AuthModule/Components/Register/Register";
import ForgotPassword from "./Modules/AuthModule/Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Modules/AuthModule/Components/ResetPassword/ResetPassword";
import ChangePassword from "./Modules/AuthModule/Components/ChangePassword/ChangePassword";
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/Dashboard/Components/Dashboard";
import GroupsList from "./Modules/Groups/Components/GroupsList";
import StudentsList from "./Modules/Students/Components/StudentsList";
import Quizzes from "./Modules/Quizzes/Components/Quizzes";
import QuizDetails from "./Modules/Quizzes/Components/QuizDetails";
import QuestionsList from "./Modules/Questions/Components/QuestionsList";
import ResultsList from "./Modules/Results/Components/ResultsList";
import ResultDetails from "./Modules/Results/Components/ResultDetails";
import { ToastContainer } from "react-toastify";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "groups", element: <GroupsList /> },
        { path: "students", element: <StudentsList /> },
        { path: "quizzes", element: <Quizzes /> },
        { path: "quiz-details", element: <QuizDetails /> },
        { path: "questions", element: <QuestionsList /> },
        { path: "my-results", element: <ResultsList /> },
        { path: "quiz-result-details", element: <ResultDetails /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
