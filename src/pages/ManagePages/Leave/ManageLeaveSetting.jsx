import { useEffect } from "react";
import TableLeaveSetting from "./TableLeaveSetting";
import useLeave from "../../../hooks/use-leave";
import { useState } from "react";
import CustomizedButtons from "../../../components/ButtonCustomization";
import Modal from "../../../components/Modal";
import AddLeaveSettingForm from "./AddLeaveSettingForm";

export default function ManageLeaveSetting() {
  const {
    getAllLeaveProfile,
    deleteLeaveProfile,
    leaveProfileById,
    setLeaveProfileById,
    leaveProfiles,
    setLeaveProfiles,
    loading,
    setLoading,
  } = useLeave();

  useEffect(() => {
    setLoading(true);
    getAllLeaveProfile()
      .then((res) => {
        const leaveProfileData = res.data.allLeaveProfile.map(
          (leaveProfile) => ({
            id: leaveProfile.id,
            leaveName: leaveProfile.leaveName,
            defaultDateAmount: leaveProfile.defaultDateAmount,
          })
        );
        setLeaveProfiles(leaveProfileData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
      <div>
        <div className="flex justify-between p-2">
          <div className="text-2xl font-bold">Leave Profile</div>
          <div className="p-4  flex "></div>
          <CustomizedButtons
            onClick={() => {
              setIsOpen(true);
            }}
            buttonName="Add Leave Profile"
          />
        </div>
        <TableLeaveSetting
          deleteLeaveProfile={deleteLeaveProfile}
          leaveProfiles={leaveProfiles}
          leaveProfileById={leaveProfileById}
          setLeaveProfileById={setLeaveProfileById}
          loading={loading}
        />
        <Modal
          title="Add Leave Profile"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <AddLeaveSettingForm />
        </Modal>
      </div>
      <div>
        <div className="flex justify-between p-2">
          <div className="text-2xl font-bold">Time Profile</div>
          <div className="p-4  flex "></div>
          <CustomizedButtons
            onClick={() => {
              setIsOpen2(true);
            }}
            buttonName="Add Time Profile"
          />
        </div>
        <TableLeaveSetting
          deleteLeaveProfile={deleteLeaveProfile}
          leaveProfiles={leaveProfiles}
          leaveProfileById={leaveProfileById}
          setLeaveProfileById={setLeaveProfileById}
          loading={loading}
        />
        <Modal
          title="Add Time Profile"
          open={isOpen2}
          onClose={() => setIsOpen2(false)}
        >
          <AddLeaveSettingForm />
        </Modal>
      </div>
    </div>
  );
}
