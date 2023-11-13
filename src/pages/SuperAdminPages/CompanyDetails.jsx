import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clockAxios } from "../../config/axios";
import { useState } from "react";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState({});
  useEffect(() => {
    clockAxios.get(`/user/getAllCompanyProfile/${companyId}`).then((res) => {
      console.log(res.data.companyProfiles);
      setCompanyDetails(res.data.companyProfiles);
    });
  }, []);
  return (
    <div>
      CompanyDetails
      <p>
        We, superAdmin , is viewing company ID {companyDetails?.id}{" "}
        {companyDetails.companyName}
      </p>
    </div>
  );
}
