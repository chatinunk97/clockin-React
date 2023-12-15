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

            filter: true,
          },
          {
            field: "lastName",
            headerName: "Last Name",

            filter: true,
          },
          { field: "startTime", headerName: "Start Time", filter: true },
          { field: "endTime", headerName: "End Time", filter: true },
          { field: "statusOT", headerName: "Status OT", filter: true },
          { field: "messageOT", headerName: "Message OT", filter: true },
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
            minWidth: 180,
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
