import MUITable from "../../components/MUITable";
import { useNavigate } from "react-router-dom";

export default function CompanyList({ data }) {
  const navigate = useNavigate();
  const columns = [
    { label: "Company Name", align: "left", key: "name" },
    { label: "Company name", align: "center", key: "companyName" },
    { label: "Is Active", align: "center", key: "isActive" },
    { label: "packageId", align: "center", key: "packageId" },
    { label: "Status", align: "center", key: "status" },
  ];
  const handleRowClick = (input) => {
    navigate(`/superadmin/${input.id}`);
  };
  return (
    <div className="p-5 px-10">
      <p>Company List</p>
      <MUITable data={data} columns={columns} handleRowClick={handleRowClick} />
    </div>
  );
}
