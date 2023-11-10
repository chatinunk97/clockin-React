import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";

export const OTContext = createContext();
export default function OTContextProvider({ children }) {
  return (
    <OTContext.Provider value={"Test OT Context"}>
      {children}
    </OTContext.Provider>
  );
}
