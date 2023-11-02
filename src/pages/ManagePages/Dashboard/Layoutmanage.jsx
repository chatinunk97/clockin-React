import { Outlet } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"


export default function Layoutmanage() {
    return (
        <div className="flex h-screen">
            <DashboardLayout />
            <Outlet />
        </div>
    )
}
