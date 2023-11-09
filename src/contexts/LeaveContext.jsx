import { createContext } from "react";
import { clockAxios, dashboardAxios } from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const LeaveContext = createContext();

export default function LeaveContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [leaveProfiles, setLeaveProfiles] = useState([]);
  const [leaveProfileById, setLeaveProfileById] = useState({});
<<<<<<< HEAD
  const [userLeave, setUserLeave] = useState([]);
=======

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

>>>>>>> origin/develop
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

<<<<<<< HEAD
  const getUserLeaveByUserId = async (data) => {
    try {
      const res = await clockAxios.get("/leave/getUserLeave", data);
      setUserLeave(res.data.userLeave);
    } catch (error) {
=======
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
>>>>>>> origin/develop
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
<<<<<<< HEAD
      console.error("Error:", error);
=======
      console.log(err);
>>>>>>> origin/develop
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
<<<<<<< HEAD
        getUserLeaveByUserId,
        userLeave,
=======
        deleteLeaveProfile,
>>>>>>> origin/develop
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
