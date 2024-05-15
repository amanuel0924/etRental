import React from "react"
import { FcComboChart } from "react-icons/fc"
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  LANDLORD_BROKER_DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "./constants"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-gray-700 hover:no-underline active:bg-gray-600 rounded-sm text-base"

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="flex flex-col p-3 w-60 bg-gray-900 text-white ">
      <Link
        to={`/`}
        className="flex items-center justify-center text-2xl font-bold space-x-3 "
      >
        <FcComboChart size={29} />
        <span> etRental</span>
      </Link>
      <div className="flex-1 flex flex-col gap-0.5 pt-6 ">
        {(user?.role === "admin" || user?.role === "super") &&
          DASHBOARD_SIDEBAR_LINKS.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.key}
                className={linkClass}
                style={({ isActive }) => ({
                  color: isActive ? "CornflowerBlue" : "white",
                })}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          })}
        {(user?.role === "landlord" || user?.role === "broker") &&
          LANDLORD_BROKER_DASHBOARD_SIDEBAR_LINKS.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.key}
                className={linkClass}
                style={({ isActive }) => ({
                  color: isActive ? "CornflowerBlue" : "white",
                })}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          })}
      </div>
      <div className=" flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => {
          return (
            <p key={item.key} className={linkClass}>
              <span>{item.icon}</span>
              {item.label}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
