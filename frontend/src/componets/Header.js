import React from "react"
import { MdHomeWork } from "react-icons/md"
import { FaSearch } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className="h-16 shadow-md">
      <div className="h-full flex  container mx-auto items-center justify-between">
        <div>
          <MdHomeWork size={32} />
        </div>
        <div className="">
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <div className="border-2 rounded-full border-gray-400">
                <input
                  placeholder="Search house..."
                  className="p-2 rounded-l-full outline-none border-r-2 border-gray-400"
                />
                <button className="px-2">
                  <FaSearch className="hover:scale-125 duration-200 " />
                </button>
              </div>
            )}
        </div>
        <div>
          <Link to="/login">sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
