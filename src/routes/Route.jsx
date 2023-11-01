import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginMainPage from "../pages/AuthPages/Login/LoginMainPage";
import RegisterMainPage from "../pages/AuthPages/Register/RegisterMainPage";
import ClockinMainPage from "../pages/Clockin-out/ClockinMainPage";
import ProfileRecordMainPage from "../pages/Profile/Profile_Record/ProfileRecordMainPage";
import ProfileLeaveMainPage from "../pages/Profile/Profile_Request/Leave/ProfileLeaveMainPage";
import DashboardMainPage from "../pages/ManagePages/Dashboard/DashboardMainPage";
import IncomingRequestMainPage from "../pages/ManagePages/IncomingRequest/IncomingRequestMainPage";
import MainLayout from "../pages/MainLayout";
import ProfileMainPage from "../pages/Profile/ProfileMainPage";
import PersonalProfilePage from "../pages/Profile/Profile_PersonalProfile/PersonalProfilePage";
import PeoplePage from "../pages/Profile/Profile_People/PeoplePage";
import SetPasswordMainPage from "../pages/AuthPages/SetPasswordMainPage";
import ForgetPasswordMainPage from "../pages/AuthPages/Login/ForgetPasswordMainPage";
import LeaveFormPage from "../pages/Profile/Profile_Request/Leave/LeaveFormPage";
import MyLeavePage from "../pages/Profile/Profile_Request/Leave/MyLeavePage";
import ProfileOTMainPage from "../pages/Profile/Profile_Request/OT/ProfileOTMainPage";
import MyOTForm from "../pages/Profile/Profile_Request/OT/MyOTForm";
import OTForm from "../pages/Profile/Profile_Request/OT/OTform";
import RedirectIfAuthenticated from "../features/auth/RedirectIfAuthenticated";
import Authenticated from "../features/auth/Authenticated";

export default function Route() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <RedirectIfAuthenticated>
          <LoginMainPage />
        </RedirectIfAuthenticated>
      ),
    },
    { path: "/register", element: <RegisterMainPage /> },
    { path: "/setpassword", element: <SetPasswordMainPage /> },
    { path: "/forgetpassword", element: <ForgetPasswordMainPage /> },
    {
      path: "/",
      element: (
        <Authenticated>
          <MainLayout />
        </Authenticated>
      ),
      errorElement: <h1>Not Found</h1>,
      children: [
        { path: "/clockin", element: <ClockinMainPage /> },
        {
          path: "/profile",
          element: <ProfileMainPage />,
          children: [
            { path: "/profile/", element: <PersonalProfilePage /> },
            { path: "/profile/record", element: <ProfileRecordMainPage /> },
            { path: "/profile/people", element: <PeoplePage /> },
            {
              path: "/profile",
              element: <ProfileLeaveMainPage />,
              children: [
                { path: "/profile/leave", element: <LeaveFormPage /> },
                { path: "/profile/myleave", element: <MyLeavePage /> },
              ],
            },
            {
              path: "/profile",
              element: <ProfileOTMainPage />,
              children: [
                { path: "/profile/ot", element: <OTForm /> },
                {
                  path: "/profile/myot",
                  element: <MyOTForm />,
                },
              ],
            },
          ],
        },
      ],
    },

    ,
    {
      path: "/manage",
      element: (
        <div>
          Manage Page
          <Outlet />
        </div>
      ),
      children: [
        { path: "/manage/dashboard", element: <DashboardMainPage /> },
        {
          path: "/manage/incomingrequest",
          element: <IncomingRequestMainPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
