import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import clockListChange from "../utils/StructureChange/clockList";

export const OTContext = createContext();
export default function OTContextProvider({ children }) {
  const [clockList, setClockList] = useState([]);

  useEffect(() => {
    clockAxios.get("/clock").then((res) => {
      setClockList(clockListChange(res.data));
    });
  }, []);

  const shareObj = {
    clockList,
  };
  return <OTContext.Provider value={shareObj}>{children}</OTContext.Provider>;
}
