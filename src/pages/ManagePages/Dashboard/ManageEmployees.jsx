import { useState } from "react";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import CustomizedButtons from "../../../components/ButtonCustomization";
import { useEffect } from "react";
import CustomizedInputBase from "../../../components/SearchBar";
import useUser from "../../../hooks/use-user";

export default function ManageEmployees() {
    const { getalluser, allUser, loading } = useUser();

    useEffect(() => {
        getalluser()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    return (

        <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] max-h-[896px] overflow-y-auto">
            <div className="flex justify-center items-center gap-4 md:w-full">
                <div className="flex justify-center items-center p-6">
                    <div className="flex justify-center items-center gap-2 w-60">
                        <CustomizedInputBase />
                    </div>
                    <div onClick={() => {
                        setIsOpen(true)
                    }} className="rounded-3xl w-32 p-1 ml-9">
                        <CustomizedButtons />
                    </div>
                </div>

            </div>
            <div>
                <TableEmployee allUser={allUser} loading={loading} />
                <Modal
                    title="Add User "
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <AddmployeeForm allUser={allUser} onClose={() => setIsOpen(false)} />
                </Modal>
            </div>
        </div>
    );
}
