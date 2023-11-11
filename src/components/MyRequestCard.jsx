import { FcOvertime } from "react-icons/fc";


export default function MyRequestCard({ myrequestLeave }) {
    return (
        <div className="w-full h-36 border border-black rounded-2xl flex shadow-lg">
            <div className="flex h-full items-center p-2 justify-start gap-6 w-full">
                <div className="text-5xl">
                    <FcOvertime />
                </div>
                <div>
                    <div className="flex flex-col gap-2">
                        <h1>Id: {myrequestLeave.id}</h1>
                        <h1>StartDate: {myrequestLeave.startDate}</h1>
                        <h1>EndDate: {myrequestLeave.endDate}</h1>
                        <h1>{myrequestLeave.leaveType}</h1>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-end">
                <h1>Status: {myrequestLeave.statusRequest}</h1>
            </div>
        </div>
    );
}
