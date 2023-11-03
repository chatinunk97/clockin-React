import { useState } from "react";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";


export default function ManageEmployees() {

    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className=" flex flex-col justify-center w-full p-2">
            <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-3 items-baseline p-4">
                    <div>
                        <button className="w-32 p-2 bg-slate-200 rounded-2xl">Fliter</button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <h1>ICON</h1>
                        <input type="text" className="w-[400px] p-2 rounded-2xl border bg-stone-100" placeholder="....." />
                    </div>
                    <div>
                        <button className="w-32 p-2 bg-orange-500 rounded-2xl transition-transform hover:scale-105 hover:bg-orange-200 text-white font-bold"
                            onClick={() => {
                                setIsOpen(true)
                            }}>Add User</button>
                    </div>
                </div>
                <div>
                    <TableEmployee />
                    <Modal title="Add User " open={isOpen} onClose={() => setIsOpen(false)}>
                        <AddmployeeForm />
                    </Modal>
                </div>
            </div>
        </div>

    );
}

