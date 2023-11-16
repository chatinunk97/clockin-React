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
          {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            filter: true,
          },
          {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            filter: true,
          },
          { field: "startTime", headerName: "Start Time", flex: 1, filter: true },
          { field: "endTime", headerName: "End Time", flex: 1, filter: true },
          { field: "statusOT", headerName: "Status OT", flex: 1, filter: true },
          { field: "messageOT", headerName: "Message OT", flex: 1, filter: true },
          {
            field: "actionButtons",
            headerName: "",
            cellRenderer: (params) => (
              <div className="flex gap-2 justify-center items-center h-full">
                <div className="p-2">
                  <Link to={`/manage/ot-request/${params.data.id}`}>
                    <SmallButton
                      bg="bg-azure-600"
                      hover="hover:bg-azure-400"
                      buttonName="View"
                      onClick={() => {
                        console.log('xxxx', params.data.id)
                      }}
                    />
                  </Link>
                </div>
              </div>
            ),
            flex: 1,
            resizable: true,
          },
        ]}

        allData={allRequestOT}
        loading={loading}
        height="700px"
      />
    </div>
  );
}
