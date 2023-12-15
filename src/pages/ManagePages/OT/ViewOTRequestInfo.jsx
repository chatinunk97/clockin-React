
import { dashboardAxios } from "../../../config/axios";
import useOT from "../../../hooks/use-OT";
import SmallButton from "../../../components/SmallButton";
import { useState } from "react";
import { useEffect } from "react";

export default function ViewOTRequestInfo({ request, setRequest, requestOTId }) {
    console.log(request)
    const clockInDate = request?.clock?.clockInTime ? new Date(request?.clock?.clockInTime).toLocaleDateString() : '';
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const clockInTime = request?.clock?.clockInTime ? new Date(request?.clock?.clockInTime).toLocaleTimeString(undefined, options) : '';
    const clockOutTime = request?.clock?.clockOutTime ? new Date(request?.clock?.clockOutTime).toLocaleTimeString(undefined, options) : '';
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const { updateOTRequest } = useOT()


    useEffect(() => {
        if (
            request.statusOT === "ACCEPT" ||
            request.statusOT === "REJECT"
        ) {
            setIsButtonVisible(false);
        }
    }, [request.statusOT]);

    const handleOT = async (e, status) => {
        try {
            e.preventDefault();
            const input = { ...request };
            delete input.userLeave;
            input.statusOT = status;
            const result = await updateOTRequest(input);
            if (!result) {
                return;
            }
            const updatedRequestData = await dashboardAxios.get(
                `/ot/getRequestOT/${requestOTId}`
            );
            setRequest(updatedRequestData.data.requestOTId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-lg flex gap-60">
            <div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">id:</p>
                    {request?.id}
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Date:</p>{" "}
                    {clockInDate}
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">clockInTime:</p>{" "}
                    {clockInTime}
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">clockOutTime:</p>{" "}
                    {clockOutTime}
                </div>

                <div className="flex flex-row gap-2">
                    <p className="font-semibold">OT Message:</p> {request?.messageOT}
                </div>
            </div>
            <div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">OT Start </p>{" "}
                    {request?.startTime}
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">OT End:</p>{" "}
                    {request?.endTime}
                </div>

                <div className='flex gap-2 font-semibold'>Request Status: <p className='text-orange-500'>{request?.statusOT}</p></div>
                <br />
                <div className="flex gap-3">
                    {isButtonVisible && (
                        <>
                            <SmallButton
                                p="px-20 py-4"
                                onClick={(e) => {
                                    handleOT(e, "ACCEPT");
                                }}
                                buttonName="Approve"
                            />
                            <SmallButton
                                p="px-20 py-4"
                                onClick={(e) => {
                                    handleOT(e, "REJECT");
                                }}
                                buttonName="Reject"
                                bg="bg-red-600"
                                hover="hover:bg-red-400"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
