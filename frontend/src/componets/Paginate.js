import React from "react"
import { Link } from "react-router-dom"

const Paginate = ({ page, pages, link = "/dashboard/users" }) => {
  return (
    pages > 1 && (
      <div className=" flex justify-center    w-full ">
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} to={`${link}/${x + 1}`}>
            <div
              className={`${
                x + 1 === page
                  ? " bg-violet-700 text-white border-2 border-violet-700"
                  : ""
              } px-3 py-2 text-gray-700 border-2 rounded-md mx-1  border-gray-800`}
            >
              {x + 1}
            </div>
          </Link>
        ))}
      </div>
    )
  )
}

export default Paginate
