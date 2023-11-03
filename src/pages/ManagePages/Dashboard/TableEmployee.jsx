import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/EditEmployeeFrom";
import { useEffect } from "react";
import { dashboardAxios } from "../../../config/axios";
import Loading from "../../../components/Loading";
import { useMemo } from "react";

export default function TableEmployee() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allUser, setAllUser] = useState([]);
    const [UserbyId, setUserById] = useState({})



    useEffect(() => {
        setLoading(true)
        dashboardAxios.get('/user/getAllUser')
            .then(res => {
                const userData = res.data.allUser.map(user => ({
                    PhotoImg: user.profileImage,
                    FistName: user.firstName,
                    LastName: user.lastName,
                    Position: user.position,
                    Supervisor: user.userBossId || '',
                    EmployeeID: user.employeeId,
                    PhoneNumber: user.mobile,
                    Email: user.email,
                    id: user.id
                }));
                setAllUser(userData);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, []);


    const [columnDefs] = useState([
        { field: "FistName", flex: 1 },
        { field: "LastName", flex: 1 },
        { field: "Position", flex: 1 },
        { field: "Supervisor", flex: 1 },
        { field: "EmployeeID", flex: 1 },
        { field: "PhoneNumber", flex: 1 },
        { field: "Email", flex: 1 },
        {
            field: "actionButtons",
            headerName: "",
            cellRenderer: (params) => (
                <div className="flex gap-2 justify-center items-center h-full">
                    <div className="p-2">
                        <button
                            onClick={() => {
                                setUserById(params.data)
                                setIsOpen(true);
                            }}
                            className="font-bold text-white w-14 h-6 bg-green-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-green-400"
                        >
                            Edit
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                console.log(params.data);
                                console.log(UserbyId)
                            }}
                            className="font-bold text-white w-14 h-6 bg-blue-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-blue-400"
                        >
                            View
                        </button>
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
        return ['desc', 'asc', null];
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 700, width: "100%" }}>
            {loading && <Loading />}
            <AgGridReact rowData={allUser} gridOptions={gridOptions} columnDefs={columnDefs} sortingOrder={sortingOrder}></AgGridReact>
            <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
                <EditemployeeForm UserbyId={UserbyId} />
            </Modal>
        </div>
    );
}
