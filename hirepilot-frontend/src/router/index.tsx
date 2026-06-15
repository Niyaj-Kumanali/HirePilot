import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import GuardRoute from "../components/ui/GuardRoute";

import MainLayout from "../Layout/MainLayout/MainLayout";

const Interview = lazy(() => import("../pages/Interview/Interview"));
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Notifications = lazy(() => import("../pages/Notifications/Notifications"));
const Messages = lazy(() => import("../pages/Messages/Messages"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../pages/TermsConditions/TermsConditions"));
const TrainingSession = lazy(() => import("../pages/Interview/TrainingSession/TrainingSession"));
const ColdEmailCampaign = lazy(() => import("../pages/ColdEmailCampaign/ColdEmailCampaign"));

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
            path: "/cold-email",
            element: (
              <GuardRoute>
                <ColdEmailCampaign />
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
