import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "./../store/slices/userApiSlice"
import { setCredentials } from "../store/slices/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../componets/Loader"
import { FcGoogle } from "react-icons/fc"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [login, { isLoading }] = useLoginMutation()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const userformdata = { email, password }

      const res = await login(userformdata).unwrap()
      console.log("ress,", res)
      dispatch(setCredentials(res))
      toast.success("you are logedin succefuly")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "login faild")
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
              Log in to your account
            </h1>
            <p className="mt-2 text-gray-500">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form id="signInForm" onSubmit={loginHandler}>
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
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-2 border-gray-300 px-3 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none rounded-md"
                />
              </div>
              <div className="relative mt-6">
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
              <Link
                to="/forgotPassword"
                className="font-semibold  text-custom-violete hover:underline focus:text-gray-800 focus:outline-none"
              >
                Forgote Password
              </Link>
              <div className="my-6 text-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-md bg-custom-violete px-3 py-3 text-white focus:bg-gray-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                )}{" "}
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md space-x-3   px-3 py-3 border-2 flex justify-center"
                >
                  <FcGoogle size={25} />
                  <span> Sign in with Google</span>
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Don&#x27;t have an account yet?
                <Link
                  to="/register"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Register
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

export default Login
