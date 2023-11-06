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

    console.log(employee)

    // const hadleDelete = async (e) => {
    //     try {
    //         e.preventDefault();
    //         const res = await dashboardAxios.delete(`/user/deleteUser/${userId}`)
    //         if (res.status === 400) {
    //             Swal.fire({
    //                 position: 'center',
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //         if (res.status === 200) {
    //             Swal.fire({
    //                 position: 'center',
    //                 icon: 'success',
    //                 title: 'Delete success!',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     } catch (err) {
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: "you don't have permission to access",
    //             showConfirmButton: false,
    //             timer: 3000
    //         })
    //     }
    // }


    // Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!"
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         Swal.fire({
    //             title: "Deleted!",
    //             text: "Your file has been deleted.",
    //             icon: "success"
    //         });
    //     }
    // });


    const hadleDelete = async (e) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"

            });

            if (result.isConfirmed) {
                await dashboardAxios.delete(`/user/deleteUser/${userId}`);
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
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
                        <h1>{employee.firstName} {employee.lastName}</h1>
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
                        <div onClick={hadleDelete}>
                            <DeleteButtons />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
