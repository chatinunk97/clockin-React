import { createContext } from "react";
import { dashboardAxios } from "../config/axios";

export const LeaveContext = createContext();

export default function LeaveContextProvider({ children }) {
  const getAllLeaveProfile = async () =>
    await dashboardAxios.get("/leave/getAllLeaveProfile");

  return (
    <LeaveContext.Provider value={getAllLeaveProfile}>
      {children}
    </LeaveContext.Provider>
  );
}
