import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


const LeftNavbar = ({  onLogout }) => {

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem>
          <ListItemText primary={`SUPERADMIN PAGE`} />
        </ListItem>
        <ListItem className="flex flex-col">
          <Link to={'/superadmin'}>Company List</Link>
          <Button color="secondary" onClick={onLogout}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftNavbar;