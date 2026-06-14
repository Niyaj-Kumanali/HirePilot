import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Interview from "../pages/Interview/Interview";
import Jobs from "../pages/Jobs/Jobs";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import GuardRoute from "../components/ui/GuardRoute";
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
 * - GuardRoutes for authenticated content
 * - GuardRoute requireAuth={false}s for guest-only pages (Login/Signup)
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
              <GuardRoute>
                <Interview />
              </GuardRoute>
            ),
          },
          {
            path: "/profile",
            element: (
              <GuardRoute>
                <Profile />
              </GuardRoute>
            ),
          },
          {
            path: "/notifications",
            element: (
              <GuardRoute>
                <Notifications />
              </GuardRoute>
            ),
          },
          {
            path: "/messages",
            element: (
              <GuardRoute>
                <Messages />
              </GuardRoute>
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
          <GuardRoute>
            <TrainingSession />
          </GuardRoute>
        ),
      },
      // Auth routes (guest only)
      {
        path: "/signup",
        element: (
          <GuardRoute requireAuth={false}>
            <SignUp />
          </GuardRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <GuardRoute requireAuth={false}>
            <SignIn />
          </GuardRoute>
        ),
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
