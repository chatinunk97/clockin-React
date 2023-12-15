import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios, dashboardAxios } from "../config/axios";
import clockListChange from "../utils/StructureChange/clockList";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const OTContext = createContext();
export default function OTContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [clockList, setClockList] = useState([]);
  const [OT, setOT] = useState([]);
  const [allRequestOT, setAllRequestOT] = useState([]);
  const [date, setDate] = useState(new Date());
  const [UserName, setUserName] = useState([]);

  useEffect(() => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    clockAxios.get(`/clock?dateStart=${formattedDate}`).then((res) => {
      setClockList(clockListChange(res.data));
      getAllOT();
    });
  }, [date]);

  const createRequestOT = async (data) => {
    try {
      const res = await clockAxios.post("/ot/requestOT", data);
      setOT([...OT, res.data.OT]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOT = async () => {
    try {
      const res = await clockAxios.get("/ot/myRequestOT");
      setOT(res.data.OT);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRequestOT = async () => {
    setLoading(true);
    await dashboardAxios
      .get("/ot/requestOT")
      .then((res) => {
        const OTData = res.data.OT.map((ot) => ({
          id: ot.id,
          firstName: ot.User.firstName,
          lastName: ot.User.lastName,
          startTime: ot.startTime,
          endTime: ot.endTime,
          statusOT: ot.statusOT,
          messageOT: ot.messageOT,
        }));
        setAllRequestOT(OTData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateOTRequest = async (data) => {
    try {
      const res = await dashboardAxios.patch("/ot/requestOT", data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update OT request status success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return true;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
  };

  const shareObj = {
    clockList,
    createRequestOT,
    getAllOT,
    OT,
    getAllRequestOT,
    allRequestOT,
    loading,
    date,
    setDate,
    UserName,
    updateOTRequest,
  };

  useEffect(() => {
    console.log("allRequestOT updated:", allRequestOT);
  }, [allRequestOT]);
  return <OTContext.Provider value={shareObj}>{children}</OTContext.Provider>;
}
