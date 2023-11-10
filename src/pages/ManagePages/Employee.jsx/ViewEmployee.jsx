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
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function ViewEmployee() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [employee, setEmployee] = useState({});
    const [clock, setClock] = useState([]);



    useEffect(() => {
        dashboardAxios.get(`user/getUser/${userId}`)
            .then(res => {
                setEmployee(res.data.user);

                const ClockData = res.data.user.clock.map((clockitem) => ({
                    Date: formatDate(clockitem.clockInTime),
                    Clockin: formatTime(clockitem.clockInTime),
                    Clockout: formatTime(clockitem.clockOutTime),
                    Status: clockitem.statusClockIn,
                }));
                setClock(ClockData);
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);

    // Function to format date (DD/MM/YYYY)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    // Function to format time (HH:MM:SS)
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'HH:mm:ss');
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
                confirmButtonText: "Yes"

            });

            if (result.isConfirmed) {
                const res = await dashboardAxios.delete(`/user/deleteUser/${userId}`);
                await Swal.fire({
                    title: "Deactivate!",
                    text: "User has been deactivate.",
                    icon: "success"
                })
                if (res.status === 200) {
                    return navigate('/manage/employees')
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
        { field: "Date", width: 180 },
        { field: "Clockin", width: 180 },
        { field: "Clockout", width: 180 },
        { field: "Status", width: 160 },
        { field: "Leave", width: 160 },
        { field: "OT", flex: 1 }
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
                    <div className="w-80 h-80 rounded-full hidden md:block bg-slate-200 ">
                        <img src={employee.profileImage} alt="UserPhoto" className="w-full h-full rounded-full shadow-2xl" />
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
