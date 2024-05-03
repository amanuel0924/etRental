import React from "react"
import { Outlet } from "react-router-dom"

const DashboredLayout = () => {
  return (
    <div>
      <div>header</div>
      <div>sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboredLayout
