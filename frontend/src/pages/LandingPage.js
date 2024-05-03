import React from "react"
import landingPageImage from "./../assets/landing.jpg"
import { FaSearch } from "react-icons/fa"

const Home = () => {
  return (
    <div className=" w-full h-screen  ">
      <div className="  bg-cover bg-center h-full w-full">
        <div
          className="h-[500px] w-full bg-no-repeat bg-cover bg-center flex items-center justify-center "
          style={{ backgroundImage: `url('${landingPageImage}')` }}
        >
          <div className="  flex flex-col  items-center max-w-[800px] ">
            <h1 className=" text-white text-3xl py-3 font-bold">
              Find your dream house to liive in
            </h1>
            <p className=" text-white text-md pb-2">
              We have the best houses for you to live in. You can rent
            </p>
            <div className=" bg-white flex flex-col rounded-lg w-full">
              <h4 className=" font-semibold text-center w-full p-1   h-full border-b-2">
                <span className=" p-1  border-b-4 border-purple-600">
                  To rent
                </span>
              </h4>
              <div className="felx flex-col rounded-b-lg px-2  mt-2">
                <label htmlFor="location" className=" text-sm font-semibold">
                  Enter a location
                </label>
                <div className="flex space-x-2 justify-between   pb-2 ">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="eg. AddisAbaba"
                    className="px-2  w-full border-2 focus:outline-none rounded-md border-gray-500  "
                  />
                  <button className=" bg-violet-600 rounded-md text-white px-4 py-1 space-x-3  flex items-center justify-between   border">
                    <FaSearch fontWeight={50} />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
