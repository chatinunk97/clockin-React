import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SmallButton from "../../../components/SmallButton";
import { Link } from "react-router-dom";
import useLeave from "../../../hooks/use-leave";
import ManageTable from "../../../components/ManageTable";

export default function TableLeaveRequest() {
  const { allRequestLeaves, loading } = useLeave();

  return (
    <div className="flex flex-col justify-center gap-4 w-full px-5 py-2 ">
    <ManageTable
      columns={[
        { field: "firstName", flex: 1 },
        { field: "lastName", flex: 1 },
        { field: "leaveName", flex: 1 },
        { field: "startDate", flex: 1 },
        { field: "endDate", flex: 1 },
        { field: "statusRequest", flex: 1 },
        { field: "messageLeave", flex: 1 },
        {
          field: "actionButtons",
          headerName: "",
          cellRenderer: (params) => (
            <div className="flex gap-2 justify-center items-center h-full">
              <div className="p-2">
                <Link to={`/manage/leave-request/${params.data.id}`}>
                  <SmallButton
                    bg="bg-blue-600"
                    hover="hover:bg-blue-400"
                    buttonName="View"
                  />
                </Link>
              </div>
            </div>
          ),
        },
      ]}
      allData={allRequestLeaves}
      loading={loading}
      height="700px"
    />
    </div>
  );
}
