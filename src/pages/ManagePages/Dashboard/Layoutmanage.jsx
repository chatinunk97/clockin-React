import { Outlet } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"


export default function Layoutmanage() {
    return (
        <div className=" flex md:flex-row flex-col h-screen w-full">
            <div className="z-10">
                <DashboardLayout />
            </div>
            <Outlet />
        </div>
    )
}
