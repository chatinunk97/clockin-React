import React from "react";
import { Outlet } from "react-router-dom";



export default function MainLayout() {
  return (
    <div>
      MainLayout
      <Outlet />

    </div>
  );
}
