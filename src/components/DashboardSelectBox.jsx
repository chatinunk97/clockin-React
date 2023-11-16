import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

export default function DashboardSelectBox() {
  const [selectOption, setSelectedOption] = useState("default");
  return (
    <div>
      <div>
        <Select
          className="select w-full max-w-xs bg-white shadow"
          defaultValue="default"
          value={selectOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <MenuItem value="default" disabled>
            Filter by Month
          </MenuItem>
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </div>
    </div>
  );
}
