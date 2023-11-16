import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill, BsCalendarEvent, BsFillMoonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DashboardMenu = [
    { id: 1, to: "/manage/dashboard", Icon: AiFillHome, text: "Dashboard" },
    { id: 2, to: "/manage/employees", Icon: BsPersonFill, text: "Employees" },
    {
      id: 3,
      to: "/manage/profile-setting",
      Icon: BsCalendarEvent,
      text: "Profile Setting",
    },
    {
      id: 4,
      to: "/manage/leave-request",
      Icon: BsCalendarEvent,
      text: "Leave Request",
    },
    {
      id: 5,
      to: "/manage/ot-request",
      Icon: BsFillMoonFill,
      text: "OT Request",
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="text-white flex justify-center items-center">
              <ListIcon />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            height: 300,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 10,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className=" items-start">
          <MenuItem onClick={handleClose} className="flex flex-col ">
            {DashboardMenu.map((item) => (
              <MenuItem
                key={item.id}
                onClick={handleClose}
                className="flex justify-start items-start"
              >
                <Link to={item.to} className="flex items-center gap-2 p-2 w-36">
                  {<item.Icon />}
                  {item.text}
                </Link>
              </MenuItem>
            ))}
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  );
}
