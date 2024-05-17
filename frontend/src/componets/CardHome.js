import React from "react"
import {
  IoImageOutline,
  IoBedOutline,
  IoPlayOutline,
  IoHeartOutline,
} from "react-icons/io5"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import dateFormater from "../utility/dateFormater"

const CardHome = ({ house }) => {
  const user = useSelector((state) => state.auth.user)
  console.log(house)
  return (
    <div className=" max-h-fit ">
      <div className="md:w-full max-h-fit bg-white   flex flex-wrap border-2 border-gray-300 rounded-lg ">
        <div className="md:w-1/2 w-full    ">
          <img
            alt="ecommerce"
            className="w-full md:max-w-[400px]  h-full    rounded "
            src={`http://localhost:6060/uploads/house/${house?.image[0]}`}
          />
        </div>
        <div className="md:w-1/2  w-full px-2  md:px-10 md:py-1 mt-6 md:mt-0">
          <div className="  flex   justify-between my-3  ">
            <button
              className={`${
                house.houseStatus === "available"
                  ? "border-green-500 text-green-900 bg-green-200 "
                  : house.houseStatus === "rented"
                  ? "border-blue-500 text-blue-900 bg-blue-200 "
                  : "border-gray-500 text-gray-900 bg-gray-200 "
              } border text-sm   py-1  text-center rounded-full px-2 `}
            >
              {house.houseStatus}
            </button>
            <button className="flex  items-center">
              <IoHeartOutline />
              <span className=" underline decoration-1">Save</span>
            </button>
          </div>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
            ETB {`${house.price}`}
          </h1>
          <div className="  flex  ">
            <button className=" flex justify-center items-center text-sm mx-2  gap-1">
              <IoImageOutline size={20} />
              <p>{house.image.length}</p>
            </button>
            <button className=" flex justify-center items-center  text-sm mx-2  gap-1">
              <IoBedOutline size={20} />
              <p>3</p>
            </button>
            <button className=" flex justify-center items-center text-sm mx-2  gap-1">
              <IoPlayOutline size={20} />
              <p>{house.viewCount}</p>
            </button>
          </div>
          <div className="flex flex-col  my-2">
            <h2 className=" font-bold text-xl ">{house.name}</h2>
            <p className=" flex flex-wrap  text-sm ">
              <div>
                <span className=" text-sm ">Type:</span>
                <span className=" mx-2 font-semibold lowercase text-yellow-600">
                  {`${house.type}`}
                </span>
              </div>
              <div>
                {" "}
                <span className="text-sm  ">Category:</span>
                <span className=" mx-2 font-semibold lowercase text-yellow-600">
                  {`${house.category}`}
                </span>
              </div>

              <div>
                {" "}
                <span className="text-sm  ">location:</span>
                <span className=" mx-2 font-semibold lowercase text-yellow-600">
                  {`${house.siteLocation}`}
                </span>
              </div>
            </p>
          </div>
          <p className="leading-relaxed">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn.
          </p>
          <div className="flex flex-row justify-between md:flex-col md:space-y-3 my-5 ">
            <div>
              <Link
                to={`/houses/detail/${house._id}`}
                className=" font-semibold    border-2 bg-yellow-200 border-yellow-500 text-yellow-700 text-sm outline-none  py-2   rounded-full px-5 "
              >
                Details{`${user?.role === "renter" ? " & send Offer" : ""}`}
              </Link>
            </div>
            <span className="font-thin text-sm px-0">
              Listed on {`${dateFormater(house.createdAt)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHome
