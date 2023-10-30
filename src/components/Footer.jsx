import React from "react";
import MenuItem from "./MenuItem";

export default function Footer() {
  return (
    <div className="fixed bottom-0 flex flex-col justify-evenly items-center w-full py-5 bg-blue-100 ">
      <MenuItem />
    </div>
  );
}
