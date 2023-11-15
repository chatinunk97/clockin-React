import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState } from "react";
import { useMemo } from "react";
import DeleteButtons from "../../../components/DeleteButton";
import { useEffect } from "react";
import { dashboardAxios } from "../../../config/axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useRef } from "react";
import { useCallback } from "react";
import SmallButton from "../../../components/SmallButton";
import Modal from "../../../components/Modal";
// import AddmployeeForm from "../Edit/AddEmployeeForm";
import DetailsEmployee from "./DetailsEmployee";
import { Button } from "@mui/material";

export default function ViewEmployee() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [employee, setEmployee] = useState({});
  const [clock, setClock] = useState([]);

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

  useEffect(() => {
    dashboardAxios
      .get(`user/getUser/${userId}`)
      .then((res) => {
        setEmployee(res.data.user);

        const ClockData = res.data.user.clock.map((clockitem) => ({
          Date: formatDate(clockitem.clockInTime),
          Clockin: formatTime(clockitem.clockInTime),
          Clockout: formatTime(clockitem.clockOutTime),
          Status: clockitem.statusClockIn,
        }));
        setClock(ClockData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, "HH:mm:ss");
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

  const [columnDefs] = useState([
    {
      field: "Date",
      width: 180,
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },
    { field: "Clockin", width: 150 },
    { field: "Clockout", width: 140 },
    { field: "Status", width: 140 },
    { field: "Leave", width: 140 },
    { field: "OT", width: 80 },
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
              }}
            />
          </div>
        </div>
      ),
    },
  ]);

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
  };

  const sortingOrder = useMemo(() => {
    return ["desc", "asc", null];
  }, []);

  const gridApi = useRef(null);

  const onGridReady = useCallback((params) => {
    if (params.api) {
      gridApi.current = params.api;
    }
  }, []);

  return (
    <div className="flex w-full justify-center items-center h-screen bg-slate-100 ">
      <div className="flex w-[500px] md:w-full justify-center md:gap-20 items-center flex-col md:flex-row gap-10">
        <div className="flex flex-col justify-center items-center gap-10 md:mb-32 ">
          <div className="text-4xl font-semibold md:pr-20">
            <h1>
              {employee.firstName} {employee.lastName}{" "}
            </h1>
          </div>
          <div className="w-80 h-80 rounded-full hidden md:block bg-slate-200 ">
            <img
              src={employee.profileImage}
              alt="UserPhoto"
              className="w-full h-full rounded-full shadow-2xl"
            />
          </div>
        </div>
        <div
          className="ag-theme-alpine flex flex-col gap-2"
          style={{ height: 600, width: "60%" }}
        >
          <AgGridReact
            rowData={clock}
            gridOptions={gridOptions}
            columnDefs={columnDefs}
            sortingOrder={sortingOrder}
            onGridReady={onGridReady}
            suppressMenuHide={true}
          ></AgGridReact>
          <Modal title="Details" open={isOpen} onClose={() => setIsOpen(false)}>
            <DetailsEmployee />
          </Modal>
          <div className=" items-end justify-end flex pt-6">
            {employee.isActive ? (
              <div onClick={handleDelete}>
                <DeleteButtons />
              </div>
            ) : null}
          </div>
          <div>
            <Button variant="contained">User Leave</Button>
          </div>
          <Modal></Modal>
        </div>
      </div>
    </div>
  );
}
