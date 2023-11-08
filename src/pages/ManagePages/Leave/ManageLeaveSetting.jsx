import { useState, useEffect } from "react";
import TableLeaveSetting from "./TableLeaveSetting";
import useManage from "../../../hooks/use-manage";

export default function ManageLeaveSetting() {
  const {
    getAllLeaveProfile,
    leaveProfileById,
    setLeaveProfileById,
    leaveProfiles,
    setLeaveProfiles,
  } = useManage();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
      <TableLeaveSetting
        leaveProfiles={leaveProfiles}
        leaveProfileById={leaveProfileById}
        setLeaveProfileById={setLeaveProfileById}
        loading={loading}
      />
    </div>
  );
}
