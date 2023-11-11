import { Outlet } from "@mui/icons-material";
import React from "react";
import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SuperAdminMainPage() {
  const { authUser } = useAuth();
  const { manageUser } = useManage();
  useEffect(() => {
    if (
      authUser?.position !== "SUPERADMIN" &&
      manageUser?.position !== "SUPERADMIN"
    ) {
      return navigate(`/login`);
    }
  }, []);
  const navigate = useNavigate();

  return <div>superAdminMainPage</div>;
}
