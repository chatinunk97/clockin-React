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
        console.log(res.data.requestLeave);
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
          <div className="text-4xl font-semibold w-full m-auto ml-40">
            <h1>
              {request.userLeave.user.firstName}{" "}
              {request.userLeave.user.lastName}
            </h1>
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
