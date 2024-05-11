import React from "react"
import {
  IoImageOutline,
  IoBedOutline,
  IoPlayOutline,
  IoHeartOutline,
  IoCallOutline,
  IoMailOutline,
  IoChevronForwardOutline,
} from "react-icons/io5"
import { Link } from "react-router-dom"

const CardHome = ({ house }) => {
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white border-4">
      <div className="container px-5 py-24 mx-auto border-4">
        <div className="lg:w-4/5 mx-auto flex flex-wrap border-2 ">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="  flex   justify-between my-3 ">
              <button className=" bg-yellow-500 border-none text-sm outline-none  py-1  text-center rounded-full px-2  ">
                add button
              </button>
              <button className="flex  items-center mr-3">
                <IoHeartOutline />
                <span className=" underline decoration-1">Save</span>
              </button>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              ETB 450000
            </h1>
            <div className="  flex  ">
              <button className=" flex justify-center items-center text-sm mx-2  gap-1">
                <IoImageOutline size={24} />
                <p>3</p>
              </button>
              <button className=" flex justify-center items-center  text-sm mx-2  gap-1">
                <IoBedOutline size={24} />
                <p>3</p>
              </button>
              <button className=" flex justify-center items-center text-sm mx-2  gap-1">
                <IoPlayOutline size={24} />
                <p>3</p>
              </button>
            </div>
            <div className="flex flex-col my-3">
              <h2 className=" font-bold text-lg ">
                3 bed semi ditached house for sell
              </h2>
              <span className="  text-lg">Note that the development build</span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn.
            </p>
            <div className="flex flex-row justify-between md:flex-col md:space-y-2 my-5 ">
              <div>
                <Link
                  to={`/houses/detail/${house._id}`}
                  className="   border-2 border-gray-900 text-sm outline-none  py-1   rounded-full px-3 "
                >
                  Details & send Offer
                </Link>
              </div>
              <span className="font-thin text-sm px-2">
                Listed on 12th jan 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardHome
