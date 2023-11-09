import { useContext } from "react";
import { LeaveContext } from "../contexts/LeaveContext";

export default function useAuth() {
  return useContext(LeaveContext);
}
