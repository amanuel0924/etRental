import React, { useState, useEffect } from "react"
import Loader from "../../componets/Loader"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"
import {
  useGetSingleuserQuery,
  useUpdateUserMutation,
} from "./../../store/slices/userApiSlice"

const UpdateUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const { data, error, isLoading } = useGetSingleuserQuery(id)
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()

  const updateHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !role) {
      toast.error("please fill all input")
    } else {
      try {
        const res = await updateUser({
          id,
          name,
          email,
          phone,
          role,
        }).unwrap()
        console.log(res)
        toast.success("user updated successfully")
        navigate("/dashboard/users")
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    }
  }

  useEffect(() => {
    if (data) {
      setName(data.name)
      setEmail(data.email)
      setPhone(data.phoneNumber)
      setRole(data.role)
    }
  }, [data])

  return (
    <div className="h-full">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1 className=" bg-red-100 w-full p-2 text-sm border-2 border-red-800">
          {error.data.message || error.message}
        </h1>
      ) : (
        <div className=" h-full  overflow-scroll  ">
          <div className=" mx-auto w-full max-w-md  bg-white px-6 pt-3 pb-9 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full ">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">
                  create user
                </h1>
              </div>
              <div className="mt-5">
                <form id="RegisterForm" onSubmit={updateHandler}>
                  <div className="relative mt-6">
                    <label
                      htmlFor="email"
                      className=" text-md font-medium opacity-75 "
                    >
                      Full Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter YourName"
                      className="peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                    />
                  </div>
                  <div className=" mt-6">
                    <label
                      htmlFor="phone"
                      className=" text-md font-medium opacity-75 "
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                    />
                  </div>
                  <div className=" mt-6">
                    <label
                      htmlFor="email"
                      className="  text-md font-medium opacity-75    "
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                    />
                  </div>
                  <div className=" mt-6">
                    <label
                      htmlFor="role"
                      className="  text-md font-medium opacity-75    "
                    >
                      Role
                    </label>
                    <select
                      type="text"
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="peer peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent active:outline-none focus:border-gray-500 focus:outline-none rounded-md"
                    >
                      <option value="admin">Admin</option>
                      <option value="landlord">Landlord</option>
                      <option value="broker">Broker</option>
                      <option value="renter">Renter</option>
                    </select>
                  </div>

                  <div className="my-6 text-center">
                    {updateLoading ? (
                      <Loader />
                    ) : (
                      <button
                        type="submit"
                        className="w-full rounded-md bg-custom-violete px-3 py-3 text-white focus:outline-none"
                      >
                        Update User
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateUser
