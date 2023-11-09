import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginMainPage from "../pages/AuthPages/Login/LoginMainPage";
import RegisterMainPage from "../pages/AuthPages/Register/RegisterMainPage";
import ClockinMainPage from "../pages/Clockin-out/ClockinMainPage";
import ProfileRecordMainPage from "../pages/Profile/Profile_Record/ProfileRecordMainPage";
import ProfileLeaveMainPage from "../pages/Profile/Profile_Request/Leave/ProfileLeaveMainPage";
import DashboardMainPage from "../pages/ManagePages/Dashboard/DashboardMainPage";
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
import ManageLoginMainPage from "../pages/ManagePages/Login/ManageLoginMainPage";
import Layoutmanage from "../pages/ManagePages/Dashboard/Layoutmanage";
import ManageEmployees from "../pages/ManagePages/Dashboard/ManageEmployees";
import ManageLeaveRequest from "../pages/ManagePages/Leave/ManageLeaveRequest";
import ManageOTRequest from "../pages/ManagePages/Dashboard/ManageOTRequest";
import ManageLeaveSetting from "../pages/ManagePages/Leave/ManageLeaveSetting";
import ViewEmployee from "../pages/ManagePages/Employee.jsx/ViewEmployee";
import ClockContextProvider from "../contexts/ClockContext";
import LeaveContextProvider from "../contexts/LeaveContext";
import UserContextProvider from "../contexts/UserContext";

export default function Route() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <RedirectIfAuthenticated pageType={"clock"}>
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
        <Authenticated pageType="clock">
          <MainLayout />
        </Authenticated>
      ),
      errorElement: <h1>Not Found</h1>,
      children: [
        {
          path: "/clockin",
          element: (
            <ClockContextProvider>
              <ClockinMainPage />
            </ClockContextProvider>
          ),
        },
        {
          path: "/profile",
          element: <ProfileMainPage />,
          children: [
            { path: "/profile/:userId", element: <PersonalProfilePage /> },
            { path: "/profile/record", element: <ProfileRecordMainPage /> },
            { path: "/profile/people", element: <PeoplePage /> },
          ],
        },
        {
          path: "/leave",
          element: (
            <LeaveContextProvider>
              <ProfileLeaveMainPage />
            </LeaveContextProvider>
          ),
          children: [
            { path: "/leave/leaveform", element: <LeaveFormPage /> },
            { path: "/leave/myleave", element: <MyLeavePage /> },
          ],
        },
        {
          path: "/ot",
          element: <ProfileOTMainPage />,
          children: [
            { path: "/ot/otform", element: <OTForm /> },
            {
              path: "/ot/myot",
              element: <MyOTForm />,
            },
          ],
        },
      ],
    },

    ,
    {
      path: "/manage/login",
      element: (
        <RedirectIfAuthenticated pageType={"dashboard"}>
          <ManageLoginMainPage />
        </RedirectIfAuthenticated>
      ),
    },
    {
      path: "/manage",
      element: (
        <Authenticated pageType={"dashboard"}>
          <Layoutmanage />
        </Authenticated>
      ),
      children: [
        { path: "/manage/dashboard", element: <DashboardMainPage /> },
        {
          path: "/manage/employees",
          element: (
            <UserContextProvider>
              <ManageEmployees />
            </UserContextProvider>
          ),
        },
        {
          path: "/manage/leave-setting",
          element: (
            <LeaveContextProvider>
              <ManageLeaveSetting />
            </LeaveContextProvider>
          ),
        },
        {
          path: "/manage/leave-request",
          element: (
            <LeaveContextProvider>
              <ManageLeaveRequest />
            </LeaveContextProvider>
          ),
        },
        { path: "/manage/ot-Request", element: <ManageOTRequest /> },
        { path: "/manage/employee/:userId", element: <ViewEmployee /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
