import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CompanyList from "./CompanyList";
import { clockAxios } from "../../config/axios";
import { useState } from "react";
import companyListInfo from "../../utils/StructureChange/companyListInfo";
import { Outlet } from "react-router-dom";
export default function CompanySumPage() {
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
        setCompanyList(companyListInfo(res.data.companyProfiles));
      });
    }, []);
  return (
    <div>CompanySumPage
              <CompanyList data={companyList} />
    </div>
  )
}
