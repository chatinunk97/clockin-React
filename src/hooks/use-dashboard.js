import { useContext } from "react";
import { DashboardMainContext } from "../contexts/DashboardMainContext";

export default function useDashboard() {
  return useContext(DashboardMainContext);
}
