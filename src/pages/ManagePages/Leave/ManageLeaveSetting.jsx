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

  return (
    <div className="flex flex-col md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
      <div className="flex justify-center items-center gap-4 md:w-full">
        <div
          onClick={() => {
            setIsOpen(true);
          }}
          className="rounded-3xl"
        >
          <CustomizedButtons buttonName="Add Leave Profile" />
        </div>
      </div>
      <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
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
    </div>
  );
}
