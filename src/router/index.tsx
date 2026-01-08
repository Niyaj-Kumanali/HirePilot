import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Interview from "../pages/Interview/Interview";
import Jobs from "../pages/Jobs/Jobs";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Training from "../pages/Training/Traning";
import Courses from "../pages/Courses/Courses";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/training",
        element: <Training />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/interview",
        element: <Interview />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },

    ]


  },
  {
    path: "*",
    element: <NotFound />
  }

]);
