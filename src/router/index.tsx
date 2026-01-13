import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Interview from "../pages/Interview/Interview";
import Jobs from "../pages/Jobs/Jobs";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Courses from "../pages/Courses/Courses";
import CoursePage from "../pages/Courses/Course/Course";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "../components/ProtectedRoute/AuthRoute";
import RootRoute from "../components/ProtectedRoute/RootRoute";
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages/Messages";
import Training from "../pages/Training/Traning";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <RootRoute />,
      },
      {
        path: "/landing",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      // Auth routes (guest only)
      {
        path: "/signup",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      // Protected routes
      {
        path: "/training",
        element: (
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview",
        element: (
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "/messages",
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
