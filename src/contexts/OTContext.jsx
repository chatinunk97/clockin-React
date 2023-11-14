import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import clockListChange from "../utils/StructureChange/clockList";

export const OTContext = createContext();
export default function OTContextProvider({ children }) {
  const [clockList, setClockList] = useState([]);
  const [OT, setOT] = useState([]);

  useEffect(() => {
    clockAxios.get("/clock").then((res) => {
      setClockList(clockListChange(res.data));
      getAllOT();
    });
  }, []);

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
      console.log(res.data.OT);
      setOT(res.data.OT);
    } catch (error) {
      console.log(error);
    }
  };

  const shareObj = {
    clockList,
    createRequestOT,
    getAllOT,
    OT,
  };
  return <OTContext.Provider value={shareObj}>{children}</OTContext.Provider>;
}
