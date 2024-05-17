import React from "react"
import landingPageImage from "./../assets/landing.jpg"
import Feature from "../componets/mock/Future"
import ComingSoonCard from "../componets/ComingSoonCard"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className=" w-full flex flex-col ">
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={landingPageImage}
            alt="Background"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Our Rental Website
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover amazing Houses and services that await you.
          </p>
          <Link
            to="/houses"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div>
        <div className="text-center mb-12 mt-20">
          <h2 className="text-4xl font-extrabold text-gray-900  sm:text-5xl">
            Coming Soon
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            We're working on something awesome for you! Stay tuned for updates
          </p>
        </div>
        <div className="flex space-x-6 justify-center flex-wrap">
          <ComingSoonCard />
          <ComingSoonCard />
          <ComingSoonCard />
          <ComingSoonCard />
        </div>
      </div>

      <Feature />
    </div>
  )
}

export default Home
