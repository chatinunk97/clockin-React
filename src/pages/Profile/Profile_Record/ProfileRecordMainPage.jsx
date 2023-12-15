import { useState } from "react";
import Calendar from "./Calendar";
import { useParams } from "react-router-dom";
import useLeave from "../../../hooks/use-leave";
import LeaveCard from "../../../components/LeaveCard";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function ProfileRecordMainPage() {
  const { userId } = useParams();
  const { getAcceptedLeave, userLeaveList } = useLeave();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getAcceptedLeave(userId, dayjs(selectedDate).format("YYYY-MM-DD"));
  }, []);
  return (
    <div>
      {/* <p>User number : {userId} Record </p> */}
      <Calendar
        setSelectedDate={setSelectedDate}
        getAcceptedLeave={getAcceptedLeave}
        userId={userId}
      />
      <div className="p-4">
        <p className="text-lg font-bold text-green-700">{`Showing Leave info for : ${selectedDate.toDateString()}`}</p>
        {userLeaveList.map((el) => {
          return (
            <div key={el.id} >
              <LeaveCard
                startDate={el.startDate}
                endDate={el.endDate}
                messageLeave={el.messageLeave}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
