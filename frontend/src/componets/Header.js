import React, { useState } from "react"
import Logo from "./../assets/logo.png"
import SearchHeader from "./SearchHeader"
import { Link, useLocation } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"

const Header = () => {
  const [menu, setMenu] = useState(false)
  const handleMenu = () => {
    setMenu(!menu)
  }

  const location = useLocation()
  console.log(location)
  return (
    <div className="h-16 shadow-md">
      <div className="h-full flex  container mx-auto items-center justify-between">
        <div className="z-40 px-4">
          <img src={Logo} alt="logo" className=" min-w-fit h-4" />
        </div>
        {<SearchHeader hide={1} />}
        <div className=" space-x-3 font-semibold text-gray-600 hidden mx-4 md:block">
          <Link to="/login">Houses</Link>
          <Link to="/login">Saved</Link>
          <Link to="/login">Sign in</Link>
        </div>
        <button
          onClick={handleMenu}
          id="hamMenu"
          className=" text-gray-700 duration-200 z-40 block md:hidden focus:outline-none mx-4"
        >
          {menu ? <FaBars size={32} /> : <FaXmark size={32} />}
        </button>
      </div>
      {!menu && (
        <div className=" text-black text-lg  items-center bg-white flex  flex-col  pt-32 space-y-6 w-full min-h-screen   z-30 absolute inset-0  transition-all duration-200 md:hidden ">
          <SearchHeader />
          <Link
            to=""
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="  duration-200 hover:scale-105 hover:underline"
          >
            Houses
          </Link>
          <Link
            to=""
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className=" duration-200 hover:scale-105 hover:underline"
          >
            Saved
          </Link>
          <Link
            to=""
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className=" duration-200 hover:scale-105 hover:underline"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
