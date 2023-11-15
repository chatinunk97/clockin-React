import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios, dashboardAxios } from "../config/axios";
import clockListChange from "../utils/StructureChange/clockList";
import dayjs from "dayjs";

export const OTContext = createContext();
export default function OTContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [clockList, setClockList] = useState([]);
  const [OT, setOT] = useState([]);
  const [allRequestOT, setAllRequestOT] = useState([]);
  const [date, setDate] = useState(new Date());

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
      .get("/OT/getAllRequestOT")
      .then((res) => {
        const OTData = res.data.OT.map((ot) => ({
          id: ot.id,
          startTime: ot.startTime,
          endTime: ot.endTime,
          statusOT: ot.statusOT,
          messageOT: ot.messageOT,
        }));
        setAllRequestOT(OTData);
        console.log(allRequestOT);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
  };
  return <OTContext.Provider value={shareObj}>{children}</OTContext.Provider>;
}
