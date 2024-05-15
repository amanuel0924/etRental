import React, { useState, Fragment } from "react"
import Logo from "./../assets/logo.png"
import SearchHeader from "./SearchHeader"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice"
import { useLogoutMutation } from "../store/slices/userApiSlice"
import { toast } from "react-toastify"
import { Menu, Transition } from "@headlessui/react"
import classNames from "classnames"
import { useGetProfileQuery } from "../store/slices/userApiSlice"

const Header = () => {
  const [menu, setMenu] = useState(false)
  const { data: user } = useGetProfileQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMenu = () => {
    setMenu(!menu)
  }
  const [logoutUser] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      toast.success("Logout successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }
  console.log(user)

  const location = useLocation()
  console.log(location)
  return (
    <div className="h-16 shadow-md">
      <div className="h-full flex  container mx-auto items-center justify-between">
        <Link to={"/"} className="z-40 px-4">
          <img src={Logo} alt="logo" className=" min-w-fit h-4" />
        </Link>
        {<SearchHeader hide={1} />}
        <div className=" space-x-3 items-center font-semibold text-gray-600 hidden mx-4 md:flex">
          <Link to="/houses">Houses</Link>
          <Link to="">Saved</Link>
          {user ? (
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                  <span className="sr-only">Open user menu</span>
                  <div
                    className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url("http://localhost:6060/uploads/user/${user?.image}")`,
                    }}
                  >
                    <span className="sr-only">Marc Backes</span>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => navigate("/profile")}
                        className={classNames(
                          active && "bg-gray-100",
                          "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                        )}
                      >
                        Your Profile
                      </div>
                    )}
                  </Menu.Item>
                  {user.role === "renter" && (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => navigate("/pending")}
                          className={classNames(
                            active && "bg-gray-100",
                            "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                          )}
                        >
                          My Requests
                        </div>
                      )}
                    </Menu.Item>
                  )}
                  {user.role === "renter" && (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => navigate("/rentedHouse")}
                          className={classNames(
                            active && "bg-gray-100",
                            "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                          )}
                        >
                          My Houses
                        </div>
                      )}
                    </Menu.Item>
                  )}
                  {user.role !== "renter" && (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() =>
                            navigate(
                              `${
                                user.role === "admin" || user.role === "super"
                                  ? "/dashboard/overveiw"
                                  : "/dashboard/my-houses"
                              }`
                            )
                          }
                          className={classNames(
                            active && "bg-gray-100",
                            "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                          )}
                        >
                          Dashboard
                        </div>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={logoutHandler}
                        className={classNames(
                          active && "bg-gray-100",
                          "active:bg-gray-200  rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                        )}
                      >
                        Log out
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
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
            className="  duration-200 hover:scale-105 hover:underline"
          >
            Houses
          </Link>
          <Link to="" className=" duration-200 hover:scale-105 hover:underline">
            Saved
          </Link>
          {user ? (
            <Link
              to=""
              onClick={logoutHandler}
              className=" duration-200 hover:scale-105 hover:underline"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className=" duration-200 hover:scale-105 hover:underline"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
