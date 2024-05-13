import React, { useState, useEffect } from "react"

import {
  IoImageOutline,
  IoBedOutline,
  IoPlayOutline,
  IoHeartOutline,
} from "react-icons/io5"
import { useSelector } from "react-redux"
import {
  useGetSingleHouseQuery,
  useAcceptbrokerMutation,
  useRejectBrokerMutation,
} from "../../store/slices/houseApiSlice"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import PendingForm from "../../componets/PendingForm"
import dateFormater from "../../utility/dateFormater"

const HouseDetail = () => {
  const user = useSelector((state) => state.auth.user)
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetSingleHouseQuery(id)
  const [currentImage, setCurrentImage] = useState("")

  const [acceptBroker] = useAcceptbrokerMutation()
  const [rejectBroker] = useRejectBrokerMutation()

  const handleImageClick = (img) => {
    setCurrentImage(img)
  }

  const handleAccept = async (houseId, brokerId) => {
    try {
      await acceptBroker({ houseId, brokerId }).unwrap()
      toast.success("broker accepted successfully")
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }
  const handleReject = async (houseId, brokerId) => {
    try {
      await rejectBroker({ houseId, brokerId }).unwrap()
      toast.success("broker rejected successfully")
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }
  console.log(data)

  useEffect(() => {
    if (data) {
      setCurrentImage(data.image[0])
    }
  }, [data])
  return (
    <div className="text-gray-700 body-font py-5  container mx-auto  bg-white shadow-lg mt-6 rounded-lg h-full w-full flex flex-col items-center">
      <div className="container max-w-fit px-5  mx-auto">
        <div className=" md:w-full max-h-fit bg-white   flex flex-wrap  ">
          <div className="md:w-1/2 w-full ">
            <img
              alt="ecommerce"
              className="w-full md:max-w-[500px]  h-full    rounded "
              src={`http://localhost:6060/uploads/house/${currentImage}`}
            />
          </div>
          <div className="md:w-1/2 w-full px-2  md:px-10 md:py-1 mt-6 md:mt-0">
            <div className="  flex   justify-between my-3 ">
              <button
                className={`${
                  data?.houseStatus === "available"
                    ? "border-green-500 text-green-900 bg-green-200 "
                    : data?.houseStatus === "rented"
                    ? "border-blue-500 text-blue-900 bg-blue-200 "
                    : "border-gray-500 text-gray-900 bg-gray-200 "
                } border text-sm   py-1  text-center rounded-full px-2 `}
              >
                {data?.houseStatus}
              </button>
              <button className="flex  items-center mr-3">
                <IoHeartOutline />
                <span className=" underline decoration-1">Save</span>
              </button>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              ETB {` ${data?.price}`}
            </h1>
            <div className="  flex  ">
              <button className=" flex justify-center items-center text-sm mx-2  gap-1">
                <IoImageOutline size={24} />
                <p>{data?.image.length}</p>
              </button>
              <button className=" flex justify-center items-center  text-sm mx-2  gap-1">
                <IoBedOutline size={24} />
                <p>3</p>
              </button>
              <button className=" flex justify-center items-center text-sm mx-2  gap-1">
                <IoPlayOutline size={24} />
                <p>{data?.viewCount}</p>
              </button>
            </div>
            <div className="flex flex-col my-3">
              <h2 className=" font-bold text-lg ">{data?.name}</h2>
              <p className="  text-sm space-x-3 ">
                <span className=" text-sm  ">Type:</span>
                <span className=" font-semibold lowercase text-yellow-600">
                  {`${data?.type}`}
                </span>
                <span className="text-sm   ">Category:</span>
                <span className=" font-semibold lowercase text-yellow-600">
                  {`${data?.category}`}
                </span>
              </p>
            </div>
            <p className="leading-relaxed max-w-sm">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn.
            </p>
            <p className=" mt-1 font-thin text-yellow-600">
              rented {data?.rentershistory.length} times
            </p>
            <p>
              <span className="text-sm  ">location:</span>
              <span className=" font-semibold lowercase text-yellow-600">
                {`${data?.siteLocation}`}
              </span>
            </p>
            <div className="flex flex-row justify-between md:flex-col md:space-y-2 my-5 ">
              <span className="font-thin text-sm px-0">
                Listed on {`${dateFormater(data?.createdAt)}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full  flex  justify-center mb-5   items-center p-5">
        {data?.image.map((img, index) => (
          <img
            key={index}
            alt="ecommerce"
            className={` object-cover object-center rounded border h-12 mx-2 border-gray-200 hover:cursor-pointer ${
              img === currentImage && "border-2 border-teal-700"
            }`}
            src={`http://localhost:6060/uploads/house/${img}`}
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>

      <div className=" w-full  max-h-fit bg-white   flex flex-wrap overflow-scroll  max-w-6xl ">
        <div className="md:w-1/2 w-full ">
          {user?.role === "renter" && <PendingForm id={id} />}
          {user?.role === "landlord" && (
            <div className="flex flex-col md:flex-row   my-5 p-5 w-full">
              <div className=" md:flex-1 px-4   my-4 h-fit shadow-lg ">
                <h2 className=" m-2 font-bold text-xl">Broker requests</h2>
                <div className=" rounded-lg  dark:bg-gray-700 mb-4 overflow-auto ">
                  <table className="h-fit ">
                    <thead className="bg-white border-b dark:bg-teal-700">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Broker
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Commition/%
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.brokers?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No broker request
                          </td>
                        </tr>
                      ) : (
                        data?.brokers.map((b, index) => {
                          return (
                            <tr
                              key={b.broker}
                              className={`${
                                index % 2 === 0
                                  ? "bg-gray-100 dark:bg-zinc-300"
                                  : "bg-white dark:bg-slate-400"
                              }`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {b.broker}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {b.commition}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {b.status}
                              </td>
                              <td className="text-sm text-gray-900 space-x-2 font-light px-6 py-4 whitespace-nowrap">
                                <button
                                  className=" px-3 py-1 bg-teal-800 outline-none text-white border-0 "
                                  onClick={() =>
                                    handleAccept(b.house, b.broker)
                                  }
                                >
                                  accept
                                </button>
                                <button
                                  className=" px-3 py-1 bg-red-500 outline-none text-white border-0 "
                                  onClick={() =>
                                    handleReject(b.house, b.broker)
                                  }
                                >
                                  reject
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center ">
          <div className="  ">
            <h2 className="text-2xl font-bold text-teal-700 dark:text-white mb-2">
              feedbacks
            </h2>
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-8">
                sime feed bakcs
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-8">
                sime feedbakcs
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-8">
                sime feed bakcs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseDetail
