import { useState, useEffect, useRef } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill, BsCalendarEvent, BsFillMoonFill } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import MenuHamburgerList from "./MenuitemhamburgerList";
import useManage from "../../../hooks/use-manage";
import PopupMenu from "../../../components/PopupMenu"

export default function MenuHamburger() {
  return (
    <div className="p-2">
      <PopupMenu />
    </div>

  );
}
