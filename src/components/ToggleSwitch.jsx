import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const ToggleSwitch = ({ checked, setChecked }) => {
  const handleChange = (e) => {
    console.log(e);
    setChecked((prev) => !prev);
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Check Location"
    />
  );
};

export default ToggleSwitch;
