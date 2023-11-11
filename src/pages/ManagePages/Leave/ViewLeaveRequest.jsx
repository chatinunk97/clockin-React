import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dashboardAxios } from "../../../config/axios";
import LoadingBar from "../../../components/LoadingBar";
import ViewLeaveRequestInfo from "./ViewLeaveRequestInfo";

export default function ViewLeaveRequest() {
  const { requestLeaveId } = useParams();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardAxios
      .get(`/leave/getRequestLeave/${requestLeaveId}`)
      .then((res) => {
        setRequest(res.data.requestLeave);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestLeaveId]);

  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="text-4xl  m-auto shadow-xl p-8 rounded-lg ">
            <p className="font-bold">
              {request.userLeave.user.firstName}{" "}
              {request.userLeave.user.lastName}
            </p>
            <br />
            <ViewLeaveRequestInfo
              request={request}
              setRequest={setRequest}
              requestLeaveId={requestLeaveId}
            />
          </div>
        </>
      )}
    </>
  );
}
