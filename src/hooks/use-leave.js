import { useContext } from "react";
import { LeaveContext } from "../contexts/LeaveContext";

export default function useLeave() {
  return useContext(LeaveContext);
}
