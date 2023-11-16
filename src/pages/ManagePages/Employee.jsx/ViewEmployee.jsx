import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect } from "react";
import { dashboardAxios } from "../../../config/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@mui/material";
import TableUserLeave from "./TableUserLeave";
import TableClock from "./TableClock";

export default function ViewEmployee() {
  const { userId } = useParams();
  const [employee, setEmployee] = useState({});
  const [clock, setClock] = useState([]);
  const [isShowUserLeave, setIsShowUserLeave] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, "HH:mm:ss");
  };

  useEffect(() => {
    dashboardAxios
      .get(`user/getUser/${userId}`)
      .then((res) => {
        setEmployee(res.data.user);
        console.log(res.data);
        const ClockData = res.data.user.clock.map((clockitem) => ({
          Date: formatDate(clockitem?.clockInTime),
          Clockin: formatTime(clockitem?.clockInTime),
          Clockout: formatTime(clockitem?.clockOutTime),
          Status: clockitem?.statusClockIn,
          ReasonLate: clockitem?.reasonLate,
          ReasonLocation: clockitem?.reasonLocation,
          latitudeClockIn: clockitem?.latitudeClockIn,
          longitudeClockIn: clockitem?.longitudeClockIn,
          latitudeClockOut: clockitem?.latitudeClockOut,
          longitudeClockOut: clockitem?.longitudeClockOut,
        }));
        setClock(ClockData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div className="flex w-full justify-center items-center h-screen bg-slate-100 ">
      <div className="flex w-[500px] md:w-full justify-center md:gap-20 items-center flex-col md:flex-row gap-10">
        <div className="flex flex-col justify-center items-center gap-10 md:mb-32 ">
          <div className="text-4xl font-semibold md:pr-20">
            <h1>
              {employee.firstName} {employee.lastName}{" "}
            </h1>
          </div>
          <div className="w-80 h-80 rounded-full hidden md:block bg-slate-200 ">
            <img
              src={employee.profileImage}
              alt="UserPhoto"
              className="w-full h-full rounded-full shadow-2xl"
            />
          </div>
        </div>
        <div
          className="ag-theme-alpine flex flex-col gap-2"
          style={{ height: 600, width: "60%" }}
        >
          <div className="flex gap-2">
            <Button
              variant="contained"
              onClick={() => setIsShowUserLeave(true)}
            >
              User Leave
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsShowUserLeave(false)}
            >
              Clock in-out
            </Button>
          </div>
          {isShowUserLeave ? (
            <TableUserLeave userId={userId} />
          ) : true ? (
            <TableClock employee={employee} clock={clock} />
          ) : (
            "ddd"
          )}
        </div>
      </div>
    </div>
  );
}
