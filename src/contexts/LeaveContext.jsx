import { createContext } from "react";
import { dashboardAxios } from "../config/axios";
import { useState } from "react";

export const LeaveContext = createContext();

export default function LeaveContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [leaveProfiles, setLeaveProfiles] = useState([]);
  const [leaveProfileById, setLeaveProfileById] = useState({});
  const getAllLeaveProfile = async () =>
    await dashboardAxios.get("/leave/getAllLeaveProfile");

  const updateLeaveProfile = async (updatedLeaveProfile) => {
    const res = await dashboardAxios.patch(
      "leave/updateLeaveProfile",
      updatedLeaveProfile
    );
    setLeaveProfileById({
      ...leaveProfileById,
      ...res.data.updateLeaveProfile,
    });

    getAllLeaveProfile()
      .then((res) => {
        setLeaveProfiles(res.data.allLeaveProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LeaveContext.Provider
      value={{
        getAllLeaveProfile,
        updateLeaveProfile,
        loading,
        setLoading,
        leaveProfileById,
        setLeaveProfileById,
        leaveProfiles,
        setLeaveProfiles,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
