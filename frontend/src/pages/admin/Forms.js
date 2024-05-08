import React from "react"
import { useState } from "react"
import Loader from "../../componets/Loader"
import { toast } from "react-toastify"
import { useCreateUserMutation } from "../../store/slices/userApiSlice"

const Forms = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [createUser, { isLoading, error }] = useCreateUserMutation()

  const registerHandler = async (e) => {
    e.preventDefault()
    if (!password || !email || !name || !confirmPassword || !phone || !role) {
      toast.error("please fill all input")
    } else if (password !== confirmPassword) {
      toast.error("password's are not mach")
    } else {
      try {
        const res = await createUser({
          name,
          email,
          password,
          phone,
          role,
        }).unwrap()

        toast.success("account created succesfully")
        setName("")
        setEmail("")
        setPassword("")
        setPhone("")
        setRole("")
        setConfirmPassword("")
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <>
      <div className=" h-full overflow-scroll  ">
        <div className=" mx-auto w-full max-w-md  bg-white px-6 pt-3 pb-9 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full ">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">
                create user
              </h1>
            </div>
            <div className="mt-5">
              <form id="RegisterForm" onSubmit={registerHandler}>
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
                <div className=" mt-6">
                  <label
                    htmlFor="password"
                    className="  text-md font-medium opacity-75    "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                  />
                </div>
                <div className=" mt-6">
                  <label
                    htmlFor="password"
                    className="  text-md font-medium opacity-75    "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="peer peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                  />
                </div>
                <div className="my-6 text-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-md bg-custom-violete px-3 py-3 text-white focus:outline-none"
                    >
                      Create User
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forms
