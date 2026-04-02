import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Interview from "../pages/Interview/Interview";
import Jobs from "../pages/Jobs/Jobs";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "../components/ProtectedRoute/AuthRoute";
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages/Messages";
import AboutUs from "../pages/AboutUs/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import TrainingSession from "../pages/Interview/TrainingSession/TrainingSession";

import MainLayout from "../Layout/MainLayout/MainLayout";

/**
 * Global router configuration for HirePilot.
 * 
 * Features:
 * - Nested layouts (MainLayout for primary navigation)
 * - ProtectedRoutes for authenticated content
 * - AuthRoutes for guest-only pages (Login/Signup)
 * - Absolute path for immersion simulation (/live-interview)
 */
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
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
            path: "/interview",
            element: (
              <ProtectedRoute>
                <Interview />
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
          {
            path: "/about",
            element: <AboutUs />,
          },
          {
            path: "/privacy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/terms",
            element: <TermsConditions />,
          },
        ]
      },
      {
        path: "/live-interview",
        element: (
          <ProtectedRoute>
            <TrainingSession />
          </ProtectedRoute>
        ),
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
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
