import { useContext } from "react";
import {ClockContext} from '../contexts/ClockContext'

export default function useClock() {
  return useContext(ClockContext);
}
