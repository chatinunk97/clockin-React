import ManageTable from "../../../components/ManageTable";
import SmallButton from "../../../components/SmallButton";
import { dashboardAxios } from "../../../config/axios";
import Swal from "sweetalert2";
import Modal from "../../../components/Modal";
import DetailsEmployee from "./DetailsEmployee";
import DeleteButtons from "../../../components/DeleteButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TableClock({ employee, clock }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [selectedRowData, setSelectedRowData] = useState("");

  const today = new Date();

  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  let filterParams = {
    minValidDate: "2023-01-01",
    maxValidDate: tomorrow,
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const res = await dashboardAxios.delete(`/user/deleteUser/${userId}`);
        await Swal.fire({
          title: "Deactivate!",
          text: "User has been deactivate.",
          icon: "success",
        });
        if (res.status === 200) {
          return navigate("/manage/employees");
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <Modal title="Details" open={isOpen} onClose={() => setIsOpen(false)}>
          <DetailsEmployee selectedRowData={selectedRowData} />
        </Modal>
        <div className="flex items-end justify-between w-full">
          <div className="text-2xl font-bold">Clock in-out</div>
          {employee.isActive ? (
            <div onClick={handleDelete}>
              <DeleteButtons />
            </div>
          ) : null}
        </div>
      </div>
      <ManageTable
        columns={[
          {
            field: "Date",
            width: 180,
            filter: "agDateColumnFilter",
            filterParams: filterParams,
          },
          { field: "Clockin", },
          { field: "Clockout", },
          { field: "Status", },
          { field: "OT", },
          {
            field: "actionButtons",
            headerName: "",
            cellRenderer: (params) => (
              <div className="flex gap-2 justify-center items-center h-full">
                <div className="p-2">
                  <SmallButton
                    bg="bg-blue-600"
                    hover="hover:bg-blue-400"
                    buttonName="View"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedRowData(params.data);
                      console.log(params.data);
                    }}
                  />
                </div>
              </div>
            ),
            minWidth: 180,
            resizable: true,
          },
        ]}
        allData={clock}
      />
    </>
  );
}
