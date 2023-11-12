import { useState } from "react";
import Calendar from "./Calendar";
import { useParams } from "react-router-dom";

export default function ProfileRecordMainPage() {
  const { userId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <p>User number : {userId} Record </p>
      <Calendar setSelectedDate={setSelectedDate} />
      <p>{`Showing Clock in info for date : ${selectedDate.toDateString()}`}</p>
    </div>
  );
}
