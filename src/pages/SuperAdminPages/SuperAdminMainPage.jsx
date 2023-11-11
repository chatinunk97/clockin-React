import React from "react";
import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SuperAdminSideBar from "./SuperAdminSideBar";
import CompanyList from "./CompanyList";
import { clockAxios } from "../../config/axios";
import { useState } from "react";
import companyInfo from "../../utils/StructureChange/companyInfo";

export default function SuperAdminMainPage() {
  const { authUser } = useAuth();
  const { manageUser } = useManage();
  const [companyList, setCompanyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authUser?.position !== "SUPERADMIN" &&
      manageUser?.position !== "SUPERADMIN"
    ) {
      return navigate(`/login`);
    }
    clockAxios.get("/user/getAllCompanyProfile").then((res) => {
      setCompanyList(companyInfo(res.data.companyProfiles));
    });
  }, []);

  return (
    <div className="">
      <CompanyList data={companyList} />
    </div>
  );
}
