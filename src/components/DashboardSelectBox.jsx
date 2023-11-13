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
            Filter by Date
          </MenuItem>
          <MenuItem value="one">one</MenuItem>
          <MenuItem value="two">two</MenuItem>
          <MenuItem value="three">three</MenuItem>
          <MenuItem value="four">four</MenuItem>
        </Select>
      </div>
    </div>
  );
}
