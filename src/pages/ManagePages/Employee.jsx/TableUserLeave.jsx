import { useState } from "react";
import ManageTable from "../../../components/ManageTable";
import SmallButton from "../../../components/SmallButton";
import useLeave from "../../../hooks/use-leave";
import { useEffect } from "react";
import userLeaveFormData from "../../../utils/StructureChange/userLeave";
import EditUserLeaveForm from "./EditUserLeaveForm";
import CustomizedButtons from "../../../components/ButtonCustomization";
import Modal from "../../../components/Modal";
import AddUserLeaveForm from "./AddLeaveSettingForm";

export default function TableUserLeave({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddUserLeave, setIsOpenAddUserLeave] = useState(false);
  const [userLeaveById, setUserLeaveById] = useState({});
  const { userLeave, loading, getUserLeaveByUserId, deleteUserLeave } =
    useLeave();
  const newUserLeave = userLeaveFormData(userLeave);
  useEffect(() => {
    getUserLeaveByUserId();
  }, []);
  return (
    <>
      <Modal
        title="Add User Leave"
        open={isOpenAddUserLeave}
        onClose={() => setIsOpenAddUserLeave(false)}
      >
        <AddUserLeaveForm userId={userId} onClose={setIsOpenAddUserLeave} />
      </Modal>
      <div className="flex justify-between p-2">
        <div className="text-2xl font-bold">User Leave</div>
        <CustomizedButtons
          onClick={() => {
            setIsOpenAddUserLeave(true);
          }}
          buttonName="Add User Leave"
        />
      </div>
      <ManageTable
        columns={[
          { field: "leaveName", flex: 1 },
          { field: "dateAmount", flex: 1 },
          {
            field: "actionButtons",
            headerName: "",
            cellRenderer: (params) => (
              <div className="flex gap-2 justify-center items-center h-full">
                <div className="p-2">
                  <SmallButton
                    onClick={() => {
                      setUserLeaveById(params.data);
                      setIsOpen(true);
                    }}
                  />
                </div>
                <div className="p-2">
                  <SmallButton
                    onClick={() => {
                      deleteUserLeave(params.data.id);
                    }}
                    bg="bg-red-600"
                    hover="hover:bg-red-400"
                    buttonName="Delete"
                  />
                </div>
              </div>
            ),
          },
        ]}
        allData={newUserLeave}
        loading={loading}
        editForm={
          <EditUserLeaveForm
            userId={userId}
            userLeaveById={userLeaveById}
            onClose={() => setIsOpen(false)}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
