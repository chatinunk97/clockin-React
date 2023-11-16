import { createContext } from "react";
import { clockAxios, dashboardAxios } from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export const LeaveContext = createContext();

export default function LeaveContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [leaveProfiles, setLeaveProfiles] = useState([]);
  const [leaveProfileById, setLeaveProfileById] = useState({});
  const [userLeaveList, setUserLeaveList] = useState([]);
  const [userLeave, setUserLeave] = useState([]);
  const [requestLeave, setRequestLeave] = useState([]);
  const [myrequestLeave, setMyrequestLeave] = useState([]);
  const [allRequestLeaves, setAllRequestLeaves] = useState([]);

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
        title: err.response.data.message,
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
      console.log(updatedLeaveProfile);
      const res = await dashboardAxios.patch(
        `leave/updateLeaveProfile/${updatedLeaveProfile.id}`,
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
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  const getAcceptedLeave = async (id, date) => {
    try {
      const result = await clockAxios.get(
        `/leave/getConfirmLeaveById?userId=${id}&date=${date}`
      );
      setUserLeaveList(result.data.leaveResult);
    } catch (error) {
      console.log(error);
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

  const createUserLeave = async (data) => {
    try {
      const res = await dashboardAxios.post("/leave/createUserLeave", data);

      const userLeaveData = res.data.userLeave;

      setUserLeave((prev) => {
        console.log(prev);
        return [...prev, userLeaveData];
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create User Leave success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateUserLeave = async (updatedUserLeave) => {
    try {
      const res = await dashboardAxios.patch(
        `leave/updateUserLeave/${updatedUserLeave.id}`,
        updatedUserLeave
      );
      console.log(res.data);
      const newUserLeave = [...userLeave];
      const foundIdx = newUserLeave.findIndex(
        (item) => item.id === res.data.userLeave.id
      );
      newUserLeave.splice(foundIdx, 1, res.data.userLeave);
      setUserLeave(newUserLeave);

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit User Leave success!",
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

  const deleteUserLeave = async (id) => {
    try {
      const res = await dashboardAxios.delete(`/leave/deleteUserLeave/${id}`);
      if (res.status === 200) {
        setUserLeave((prev) => prev.filter((el) => el.id !== id));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete User Leave success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const createRequestLeave = async (data) => {
    try {
      const newData = { ...data };
      newData.startDate = dayjs(data.startDat).format("YYYY-MM-DD");
      newData.endDate = dayjs(data.endDate).format("YYYY-MM-DD");
      const res = await clockAxios.post("/leave/createRequestLeave", newData);
      setRequestLeave(res.data.requestLeave);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRequestLeaveId = async () => {
    try {
      const res = await clockAxios.get(`/leave/getRequestLeaveByUserId`);
      setMyrequestLeave(res.data.MyRequest);
      console.log(res.data.MyRequest);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRequestLeaves = async () => {
    setLoading(true);
    await dashboardAxios
      .get("/leave/getAllRequestLeaves")
      .then((res) => {
        const leaveData = res.data.requestLeaves.map((leave) => ({
          id: leave.id,
          firstName: leave.userLeave.user.firstName,
          lastName: leave.userLeave.user.lastName,
          leaveName: leave.userLeave.leaveProfile.leaveName,
          startDate: leave.startDate.split("T")[0],
          endDate: leave.endDate.split("T")[0],
          statusRequest: leave.statusRequest,
          messageLeave: leave.messageLeave,
        }));
        setAllRequestLeaves(leaveData);
        console.log(allRequestLeaves);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRequestLeave = async (data) => {
    try {
      const res = await dashboardAxios.patch("/leave/updateRequestleave", data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update leave request status success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return true;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
  };

  return (
    <LeaveContext.Provider
      value={{
        createLeaveProfile,
        getAllLeaveProfile,
        updateLeaveProfile,
        deleteLeaveProfile,
        loading,
        setLoading,
        leaveProfileById,
        setLeaveProfileById,
        leaveProfiles,
        setLeaveProfiles,
        getUserLeaveByUserId,
        userLeave,
        deleteUserLeave,
        createUserLeave,
        updateUserLeave,
        createRequestLeave,
        getAllRequestLeaves,
        updateRequestLeave,
        requestLeave,
        getRequestLeaveId,
        myrequestLeave,
        allRequestLeaves,
        getAcceptedLeave,
        userLeaveList,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
