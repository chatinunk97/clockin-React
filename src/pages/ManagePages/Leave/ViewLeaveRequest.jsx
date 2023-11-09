import { useEffect, useState } from "react";
import useLeave from "../../../hooks/use-leave";
import { useParams } from "react-router-dom";

export default function ViewLeaveRequest() {
  const { requestLeaveId } = useParams();
  const { getRequestLeaveById } = useLeave();
  const [requestLeave, setRequestLeave] = useState({});

  useEffect(() => {
    getRequestLeaveById(requestLeaveId)
      .then((res) => {
        console.log(res.data);
        setRequestLeave(res.data.requestLeave);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [requestLeaveId]);

  return <div>ViewLeaveRequest</div>;
}
