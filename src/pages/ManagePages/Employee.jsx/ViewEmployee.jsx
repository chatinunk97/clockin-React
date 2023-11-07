import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState } from "react";
import { useMemo } from "react";
import DeleteButtons from "../../../components/DeleteButton";
import { useEffect } from "react";
import { dashboardAxios } from "../../../config/axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewEmployee() {
    const { userId } = useParams();
    const [employee, setEmployee] = useState({});
    const [clock, setClock] = useState([]);



    useEffect(() => {
        dashboardAxios.get(`user/getUser/${userId}`)
            .then(res => {

                setEmployee(res.data.user);

                const ClockData = res.data.user.clock.map((clockitem) => ({
                    Date: clockitem.clockInTime,
                    Clockin: clockitem.clockInTime,
                    Clockout: clockitem.clockOutTime,
                    Status: clockitem.statusClockIn,

                }));
                setClock(ClockData)
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);

    console.log(employee.isActive)


    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"

            });

            if (result.isConfirmed) {
                const res = await dashboardAxios.delete(`/user/deleteUser/${userId}`);
                await Swal.fire({
                    title: "Deactivate!",
                    text: "User has been deactivate.",
                    icon: "success"
                });
                if (res.status === 200) {
                    window.location.replace(
                        "/manage/employees",
                    );

                }
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: "Something Went Wrong",
                showConfirmButton: false,
                timer: 3000
            });
        }
    }


    const [columnDefs] = useState([
        { field: "Date", flex: 1 },
        { field: "Clockin", flex: 1 },
        { field: "Clockout", flex: 1 },
        { field: "Status", flex: 1 },

    ])


    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
        },
    };

    const sortingOrder = useMemo(() => {
        return ["desc", "asc", null];
    }, []);
    return (
        <div className="flex w-full justify-center items-center h-screen bg-slate-100">
            <div className="flex w-[500px] md:w-full justify-center md:gap-20 items-center flex-col md:flex-row gap-10 ">
                <div className="flex flex-col justify-center items-center gap-10 md:mb-32">
                    <div className="text-4xl font-semibold md:pr-20">
                        <h1>{employee.firstName} {employee.lastName} </h1>
                    </div>
                    <div className="w-80 h-80 rounded-full hidden md:block bg-slate-200">
                        <img src={employee.profileImage} alt="UserPhoto" className="w-full h-full object-contain rounded-full shadow-2xl" />
                    </div>
                </div>
                <div className="ag-theme-alpine flex flex-col gap-2" style={{ height: 600, width: "60%" }}>
                    <div className="flex justify-end">
                        <button className="text-lg">
                            Filter By Date
                        </button>
                    </div>
                    <AgGridReact rowData={clock} gridOptions={gridOptions} columnDefs={columnDefs} sortingOrder={sortingOrder}></AgGridReact>
                    <div className=" items-end justify-end flex pt-6">
                        {employee.isActive ? (
                            <div onClick={handleDelete}>
                                <DeleteButtons />
                            </div>
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    )
}
