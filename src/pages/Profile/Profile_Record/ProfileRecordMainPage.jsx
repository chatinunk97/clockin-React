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
    console.log(
      "this is the first render selectedDate",
      getAcceptedLeave(userId,dayjs(selectedDate).format("YYYY-MM-DD"))
      
    );
  }, []);
  return (
    <div>
      <p>User number : {userId} Record </p>
      <Calendar
        setSelectedDate={setSelectedDate}
        getAcceptedLeave={getAcceptedLeave}
        userId={userId}
      />
      <p>{`Showing Clock in info for date : ${selectedDate.toDateString()}`}</p>
      {userLeaveList.map((el) => {
        return (
          <LeaveCard
            key={el.id}
            startDate={el.startDate}
            endDate={el.endDate}
            messageLeave={el.messageLeave}
          />
        );
      })}
    </div>
  );
}
