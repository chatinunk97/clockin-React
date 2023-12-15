import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dashboardAxios } from "../../../config/axios";
import LoadingBar from "../../../components/LoadingBar";
import ViewOTRequestInfo from "./ViewOTRequestInfo";
;

export default function ViewOTRequest() {
    const { requestOTId } = useParams();
    const [request, setRequest] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(requestOTId, 'slpdlspdlps')
        dashboardAxios
            .get(`/ot/getRequestOT/${requestOTId}`)
            .then((res) => {
                console.log("Data received from the server:", res.data.requestOTId);
                setRequest(res.data.requestOTId);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [requestOTId]);


    return (
        <>
            {isLoading ? (
                <LoadingBar />
            ) : (
                <>
                    <div className="text-4xl  m-auto shadow-xl p-8 rounded-lg ">
                        <p className="font-bold">
                            {request?.User?.firstName}{" "}
                            {request?.User?.lastName}
                        </p>
                        <br />
                        <ViewOTRequestInfo
                            request={request}
                            setRequest={setRequest}
                            requestOTId={requestOTId} />
                    </div>
                </>
            )}
        </>


    )
}