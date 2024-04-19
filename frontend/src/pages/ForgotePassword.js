import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForgotePasswordMutation } from "./../store/slices/userApiSlice"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../componets/Loader"

const ForgotePassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [forgote, { isLoading }] = useForgotePasswordMutation()

  const forgoteHandler = async (e) => {
    e.preventDefault()
    try {
      const userformdata = { email }

      const res = await forgote(userformdata).unwrap()
      if (res) {
        toast.success("email sent succefuly")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "something is wrong")
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [navigate, user])
  return (
    <>
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Forgote Password
            </h1>
          </div>
          <div className="mt-5">
            <form id="signInForm" onSubmit={forgoteHandler}>
              <div className="relative mt-6">
                <label
                  htmlFor="email"
                  className=" text-md font-medium opacity-75 "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                />
              </div>
              <div className="my-6 text-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-md bg-custom-violete px-3 py-3 text-white focus:bg-gray-600 focus:outline-none"
                  >
                    Send Email
                  </button>
                )}
              </div>
              <p className="text-center text-sm text-gray-500">
                if you remember your password?
                <Link
                  to="/login"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  login
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotePassword
