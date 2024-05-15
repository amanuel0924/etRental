import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./DashboardHeader"

const DashboredLayout = () => {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden bg-blue-50">
      <Sidebar />
      <div className=" flex-1 p-4">
        <Header />
        <div className="p-4 h-full overflow-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboredLayout
