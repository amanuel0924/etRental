import React, { useState } from "react"

import {
  IoImageOutline,
  IoBedOutline,
  IoPlayOutline,
  IoHeartOutline,
  //   IoCallOutline,
  //   IoMailOutline,
  //   IoChevronForwardOutline,
} from "react-icons/io5"
import { useSelector } from "react-redux"
import {
  useGetSingleHouseQuery,
  useAcceptbrokerMutation,
  useRejectBrokerMutation,
} from "../../store/slices/houseApiSlice"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const HouseDetail = () => {
  const user = useSelector((state) => state.auth.user)
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetSingleHouseQuery(id)
  const [currentImage, setCurrentImage] = useState(data?.image[0])

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

  return (
    <div className="text-gray-700 body-font py-20  bg-white border-4 h-full overflow-scroll w-full flex flex-col items-center">
      <div className="container px-5  mx-auto border-4">
        <div className="lg:w-4/5 mx-auto flex flex-wrap border-2    ">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={`http://localhost:6060/uploads/house/${currentImage}`}
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
              ETB {` ${data?.price}`}
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
              <h2 className=" font-bold text-lg ">{data?.name}</h2>
              <span className="  text-lg">Note that the development build</span>
            </div>
            <p className="leading-relaxed">{data?.description}</p>
            <div className="flex flex-row justify-between md:flex-col md:space-y-2 my-5 ">
              <span className="font-thin text-sm px-2">
                Listed on 12th jan 2024
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex  justify-center  items-center p-5">
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
      {user?.role === "landlord" && (
        <div className="flex flex-col md:flex-row -mx-4 w-full">
          <div className="md:flex-1 px-4 my-4">
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
          <div className=" md:flex-1 px-4  my-4 h-fit shadow-lg">
            <h2 className=" m-2 font-bold text-xl">Broker requests</h2>
            <div className=" rounded-lg  dark:bg-gray-700 mb-4 overflow-auto ">
              <table className="min-w-full h-fit">
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
                              onClick={() => handleAccept(b.house, b.broker)}
                            >
                              accept
                            </button>
                            <button
                              className=" px-3 py-1 bg-red-500 outline-none text-white border-0 "
                              onClick={() => handleReject(b.house, b.broker)}
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
  )
}

export default HouseDetail
