import { useContext } from "react";
import { OTContext } from "../contexts/OTContext"

export default function useOT() {
  return useContext(OTContext);
}
