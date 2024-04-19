import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useResetPasswordMutation } from "./../store/slices/userApiSlice"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../componets/Loader"

const ResetPassword = () => {
  const { token } = useParams()
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const resetHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("password's are not mach")
    } else {
      try {
        const userformdata = { password, token }
        const res = await resetPassword(userformdata).unwrap()
        if (res) {
          toast.success("reset password succefuly ")
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || "Reset faild")
      }
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
              Reset Password
            </h1>
          </div>
          <div className="mt-5">
            <form id="signInForm" onSubmit={resetHandler}>
              <div className="relative mt-6">
                <label
                  htmlFor="email"
                  className=" text-md font-medium opacity-75 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                />
              </div>
              <div className="relative mt-6">
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
                    className="w-full rounded-md bg-custom-violete px-3 py-3 text-white focus:bg-gray-600 focus:outline-none"
                  >
                    Reset
                  </button>
                )}{" "}
              </div>

              <p className="text-center text-sm text-gray-500">
                back to login?
                <Link
                  to="/login"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Login
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

export default ResetPassword
