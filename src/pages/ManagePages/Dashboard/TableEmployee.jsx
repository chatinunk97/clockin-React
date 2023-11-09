import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/EditEmployeeFrom";
import { useMemo } from "react";
import LinearIndeterminate from "../../../components/LoadingBar";
import { Link } from "react-router-dom";
import SmallButton from "../../../components/SmallButton";
import "../../../../src/styles.css"
export default function TableEmployee({ allUser, loading }) {
    const [isOpen, setIsOpen] = useState(false);
    const [UserbyId, setUserById] = useState({});
    const [columnDefs] = useState([
        { field: "firstName", width: 190 },
        { field: "lastName", width: 190 },
        { field: "position", width: 190 },
        { field: "userBossId", width: 190 },
        { field: "employeeId", width: 190 },
        { field: "mobile", width: 190 },
        { field: "email", width: 190 },
        { field: "isActive", width: 140 },
        {
            field: "actionButtons",
            flex: 1,
            headerName: "",
            cellRenderer: (params) => (
                <div className="flex gap-2 justify-center items-center h-full">
                    <div className="p-2">
                        <SmallButton
                            onClick={() => {
                                setUserById(params.data);
                                setIsOpen(true);
                            }}
                        />
                    </div>

                    <div>
                        <Link to={`/manage/employee/${params.data.id}`}>
                            <SmallButton
                                onClick={() => {
                                    setUserById(params.data);
                                }}
                                bg="bg-azure-600"
                                hover="hover:bg-azure-400"
                                buttonName="View"
                            />
                        </Link>
                    </div>
                </div>
            ),
        },
    ]);

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
        },
    };


    const sortingOrder = useMemo(() => {
        return ["desc", "asc", null];
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 700, width: "100%" }}>
            {loading && <LinearIndeterminate />}
            <AgGridReact
                rowData={allUser}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                sortingOrder={sortingOrder}
            ></AgGridReact>
            <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
                <EditemployeeForm
                    UserbyId={UserbyId}
                    allUser={allUser}
                    onClose={() => setIsOpen(false)}
                />
            </Modal>
        </div>
    );
}
