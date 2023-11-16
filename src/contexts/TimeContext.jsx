import { createContext } from "react";
import { dashboardAxios } from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const TimeContext = createContext();

export default function TimeContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [allTimeProfiles, setAllTimeProfiles] = useState([]);
  const [timeProfileById, setTimeProfileById] = useState({});
  const [allFlexibleTime, setAllFlexibleTime] = useState([]);
  const [flexibleTimeById, setFlexibleTimeById] = useState({});

  const createTimeProfile = async (newAddedTimeProfile) => {
    try {
      const res = await dashboardAxios.post(
        "time/createTimeProfile",
        newAddedTimeProfile
      );
      const timeProfileData = res.data.timeProfile;
      const newTimeProfile = {
        id: timeProfileData.id,
        start: timeProfileData.start,
        end: timeProfileData.end,
        typeTime: timeProfileData.typeTime,
      };
      setAllTimeProfiles((prev) => {
        return [...prev, newTimeProfile];
      });
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Time Profile success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const getAllTimeProfile = async () =>
    await dashboardAxios.get("/time/getAllTimeProfile");

  const updateTimeProfile = async (updatedTimeProfile) => {
    try {
      console.log(updatedTimeProfile);
      const res = await dashboardAxios.patch(
        `time/updateTimeProfile/${updatedTimeProfile.id}`,
        updatedTimeProfile
      );
      setTimeProfileById({
        ...timeProfileById,
        ...res.data.updatedTimeProfile,
      });

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Time Profile success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      getAllTimeProfile()
        .then((res) => {
          setAllTimeProfiles(res.data.allTimeProfiles);
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

  const deleteTimeProfile = async (id) => {
    try {
      const res = await dashboardAxios.delete(`time/deleteTimeProfile/${id}`);
      if (res.status === 200) {
        setAllTimeProfiles((prev) => prev.filter((el) => el.id !== id));

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Time Profile success!",
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

  const createFlexible = async (newAddedFlexibleTime) => {
    try {
      const res = await dashboardAxios.post(
        "/flexible/createFlexible",
        newAddedFlexibleTime
      );
      const createFlexibleData = res.data.flexible;
      const newFlexibleTime = {
        userId: createFlexibleData.id,
        date: createFlexibleData.date,
        timeProfileId: createFlexibleData.timeProfileId,
      };

      setAllFlexibleTime((prev) => {
        return [...prev, newFlexibleTime];
      });

      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Flexible Time success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  const getFlexibleByUserId = async (id) => {
    try {
      const res = await dashboardAxios.get(`/flexible/getFlexible/${id}`);
      setFlexibleTimeById(res.data.flexible);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateFlexible = async (updatedFlexibleTime) => {
    try {
      console.log(updatedFlexibleTime);
      const res = await dashboardAxios.patch(
        `flexible/updateTimeProfile/${updateFlexible.id}`,
        updatedFlexibleTime
      );
      setFlexibleTimeById({
        ...flexibleTimeById,
        ...res.data.updatedFlexibleTime,
      });

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Flexible Time success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      getFlexibleByUserId()
        .then((res) => {
          setAllFlexibleTime(res.data.flexible);
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

  const deleteFlexible = async (id) => {
    try {
      const res = await dashboardAxios.delete(`time/deleteFlexible/${id}`);
      if (res.status === 200) {
        setAllFlexibleTime((prev) => prev.filter((el) => el.id !== id));

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete flexible time success!",
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

  return (
    <TimeContext.Provider
      value={{
        getAllTimeProfile,
        allTimeProfiles,
        setAllTimeProfiles,
        loading,
        setLoading,
        updateTimeProfile,
        timeProfileById,
        setTimeProfileById,
        deleteTimeProfile,
        createTimeProfile,
        getFlexibleByUserId,
        flexibleTimeById,
        setFlexibleTimeById,
        allFlexibleTime,
        setAllFlexibleTime,
        updateFlexible,
        createFlexible,
        deleteFlexible,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}
