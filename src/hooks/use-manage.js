import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";

export default function useAuth() {
  return useContext(ManageContext);
}
