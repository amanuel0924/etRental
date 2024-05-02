import React from "react"
import { useLocation } from "react-router-dom"
import { FaSearch } from "react-icons/fa"

const SearchHeader = ({ hide }) => {
  const location = useLocation()

  return (
    <div className={`md:block ${hide && "hidden"} `}>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <div className="flex">
          <div className=" bg-gray-100 px-4 rounded-l-md">
            <button className=" h-full w-full text-gray-600">
              <FaSearch className="hover:scale-125 duration-200 " />
            </button>
          </div>
          <input
            placeholder="Search house..."
            className="p-2 rounded-r-md outline-none bg-gray-100"
          />
        </div>
      )}
    </div>
  )
}

export default SearchHeader
