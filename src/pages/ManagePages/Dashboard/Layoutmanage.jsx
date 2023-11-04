import { Outlet } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"


export default function Layoutmanage() {
    return (
        <div className=" flex md:flex-row flex-col h-screen">
            <DashboardLayout />
            <Outlet />
        </div>
    )
}
