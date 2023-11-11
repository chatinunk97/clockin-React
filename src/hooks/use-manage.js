import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";

export default function useManage() {
  return useContext(ManageContext);
}
