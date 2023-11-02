import { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/AddEmployeeForm";


export default function TableEmployee() {
    const [isOpen, setIsOpen] = useState(false)

    const [rowData] = useState([
        { FistName: "Bob", LastName: "Celica", Position: 'HR', Supervisor: "Jonh", EmployeeID: "010HY221", PhoneNumber: "0899919191", Email: "BOb@email.com" },
        { FistName: "Toyota", LastName: "Celica", Position: 35000, Supervisor: "Celica", EmployeeID: "Celica", PhoneNumber: "Celica", Email: "Celica" },
        { FistName: "Toyota", LastName: "Celica", Position: 35000, Supervisor: "Celica", EmployeeID: "Celica", PhoneNumber: "Celica", Email: "Celica" },
        { FistName: "Toyota", LastName: "Celica", Position: 35000, Supervisor: "Celica", EmployeeID: "Celica", PhoneNumber: "Celica", Email: "Celica" },


    ]);

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
                <div className="flex gap-2">
                    <div>
                        <button
                            onClick={(e) => {
                                console.log(params.data)
                                setIsOpen(true)
                            }}

                            className="font-bold text-white w-20 bg-green-600 rounded-xl flex justify-center items-center px-2"
                        >
                            Edit
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                console.log(params.data)
                            }}
                            className="font-bold text-white w-20 bg-blue-500 rounded-xl flex justify-center items-center px-2"
                        >
                            View
                        </button>
                    </div>
                </div>)
        }

    ]);
    const gridOptions = {
        defaultColDef: {
            resizable: true,
        },

    };
    return (

        <div className="ag-theme-alpine" style={{ height: 700, width: '100%' }}>
            {/* <Modal title="Add User " open={isOpen} onClose={() => setIsOpen(false)}>
                <EditemployeeForm />
            </Modal> */}
            <AgGridReact rowData={rowData} gridOptions={gridOptions} columnDefs={columnDefs}></AgGridReact>
        </div>


    );
}

