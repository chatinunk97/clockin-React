import { Link } from "react-router-dom";
import ManageTable from "../../../components/ManageTable";
import useOT from "../../../hooks/use-OT";
import SmallButton from "../../../components/SmallButton";

export default function TableOTRequest() {
  const { allRequestOT, loading } = useOT();

  return (
    <div className="flex flex-col justify-center gap-4 w-full px-5 py-2 ">
      <ManageTable
        columns={[
          { field: "startTime", flex: 1 },
          { field: "endTime", flex: 1 },
          { field: "statusOT", flex: 1 },
          { field: "messageOT", flex: 1 },
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
        allData={allRequestOT}
        loading={loading}
        height="700px"
      />
    </div>
  );
}
