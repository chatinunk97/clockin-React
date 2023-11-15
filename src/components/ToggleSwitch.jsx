import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Swal from "sweetalert2";

const ToggleSwitch = ({ checked, setChecked, setReasonLocation }) => {
  const handleChange = (e) => {
    if (!e.target.checked) {
      Swal.fire({
        title: "Turning of Location Check",
        input: "text",
        inputPlaceholder: "Please enter a reason",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((res) => {
        if (res.isConfirmed && res.value !== "") {
          setReasonLocation(res.value);
          setChecked((prev) => !prev);
        } else {
          return;
        }
      });
    } else {
      setReasonLocation("");
      setChecked((prev) => !prev);
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Check Location"
    />
  );
};

export default ToggleSwitch;
