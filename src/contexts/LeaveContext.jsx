import { createContext } from "react";
import { clockAxios, dashboardAxios } from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const LeaveContext = createContext();

export default function LeaveContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [leaveProfiles, setLeaveProfiles] = useState([]);
  const [leaveProfileById, setLeaveProfileById] = useState({});
  const [userLeave, setUserLeave] = useState([]);
  const [requestLeave, setRequestLeave] = useState([]);

  const createLeaveProfile = async (newAddedLeaveProfile) => {
    try {
      const res = await dashboardAxios.post(
        "/leave/createLeaveProfile",
        newAddedLeaveProfile
      );
      console.log(res);
      const leaveProfileData = res.data.leaveProfile;
      const newLeaveProfile = {
        id: leaveProfileData.id,
        leaveName: leaveProfileData.leaveName,
        defaultDateAmount: leaveProfileData.defaultDateAmount,
      };
      setLeaveProfiles((prev) => {
        return [...prev, newLeaveProfile];
      });

      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Leave Profile success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

  const getAllLeaveProfile = async () =>
    await dashboardAxios.get("/leave/getAllLeaveProfile");

  const updateLeaveProfile = async (updatedLeaveProfile) => {
    try {
      const res = await dashboardAxios.patch(
        "leave/updateLeaveProfile",
        updatedLeaveProfile
      );
      setLeaveProfileById({
        ...leaveProfileById,
        ...res.data.updateLeaveProfile,
      });

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Leave Profile success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      getAllLeaveProfile()
        .then((res) => {
          setLeaveProfiles(res.data.allLeaveProfile);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  const deleteLeaveProfile = async (id) => {
    try {
      const res = await dashboardAxios.delete(`leave/deleteLeaveProfile/${id}`);
      if (res.status === 200) {
        setLeaveProfiles((prev) => prev.filter((el) => el.id !== id));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Leave Profile success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(err);
    }
  };

  const getUserLeaveByUserId = async (data) => {
    try {
      const res = await clockAxios.get("/leave/getUserLeave", data);
      setUserLeave(res.data.userLeave);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createRequestLeave = async (data) => {
    try {
      console.log(data);
      const res = await clockAxios.post("/leave/createRequestLeave", data);
      setRequestLeave(res.data.requestLeave);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateRequestLeave = async (data) => {
    try {
      console.log(data);
      const res = await dashboardAxios.patch("/leave/updateRequestleave", data);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update leave request status success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  return (
    <LeaveContext.Provider
      value={{
        createLeaveProfile,
        getAllLeaveProfile,
        updateLeaveProfile,
        loading,
        setLoading,
        leaveProfileById,
        setLeaveProfileById,
        leaveProfiles,
        setLeaveProfiles,
        getUserLeaveByUserId,
        userLeave,
        deleteLeaveProfile,
        createRequestLeave,
        updateRequestLeave,
        requestLeave,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
