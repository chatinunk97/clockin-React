import { useState } from "react";
import { dashboardAxios } from "../../../config/axios";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import CustomizedButtons from "../../../components/ButtonCustomization";
import { useEffect } from "react";
import CustomizedInputBase from "../../../components/SearchBar";

export default function ManageEmployees() {
    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState([]);
    useEffect(() => {
        setLoading(true);
        dashboardAxios
            .get("/user/getAllUser")
            .then((res) => {
                const userData = res.data.allUser.map((user) => ({
                    PhotoImg: user.profileImage,
                    FistName: user.firstName,
                    LastName: user.lastName,
                    Position: user.position,
                    Supervisor: user.userBossId || "",
                    EmployeeID: user.employeeId,
                    PhoneNumber: user.mobile,
                    Email: user.email,
                    id: user.id,
                }));
                setAllUser(userData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
            <div className="flex justify-center items-center gap-4 md:w-full">
                <div className="flex justify-center items-center p-6">
                    <div className="flex justify-center items-center gap-2 w-60">
                        <CustomizedInputBase />
                    </div>
                    <div onClick={() => {
                        setIsOpen(true)
                    }} className="rounded-3xl w-28 p-1 ml-9">
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
                    <AddmployeeForm allUser={allUser} />
                </Modal>
            </div>
        </div>

    );
}
