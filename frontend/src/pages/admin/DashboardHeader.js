import React, { Fragment } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import { useLogoutMutation } from "../../store/slices/userApiSlice"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { logout } from "../../store/slices/authSlice"
import { useGetProfileQuery } from "../../store/slices/userApiSlice"

const DashboardHeader = () => {
  const navigate = useNavigate()
  const { data: user } = useGetProfileQuery()
  const [logoutUser] = useLogoutMutation()
  const dispatch = useDispatch()
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

  return (
    <div className="h-16 p-4 bg-white flex justify-between items-center">
      <div className="relative">
        <HiOutlineSearch className=" absolute top-1/2 -translate-y-1/2 text-gray-400 left-3" />
        <input
          type="text"
          placeholder="Search"
          className=" text-sm focus:outline-none active:outline-none h-10   border border-gray-300 rounded-sm pl-14 pr-4 w-[24rem]"
        />
      </div>
      <div>
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
                    onClick={() => navigate("/")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Home
                  </div>
                )}
              </Menu.Item>
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
      </div>
    </div>
  )
}

export default DashboardHeader
