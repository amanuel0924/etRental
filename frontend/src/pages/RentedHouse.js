import React, { useState } from "react"
import Loader from "../componets/Loader"
import { useGetMyPendingQuery } from "../store/slices/pendingSlice.js"
import { useMakeAvailableHouseMutation } from "../store/slices/houseApiSlice.js"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Modal } from "../componets/Modal"
import { useCreateReportMutation } from "../store/slices/reportApisclice.js"

const RentedHouse = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [id, setId] = useState("")
  const { data: res, isLoading, error, refetch } = useGetMyPendingQuery()
  const data = res?.filter((item) => item.status === "accepted")
  const [makeAvailableHouse, { isLoading: makeAvloading }] =
    useMakeAvailableHouseMutation()
  const [report, { isLoading: reportLoading }] = useCreateReportMutation()

  const makeAvailableHouseHandler = async (id) => {
    try {
      await makeAvailableHouse(id)
      toast.success("house available")
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }

  const reportHandler = async (e) => {
    e.preventDefault()
    if (!type || !description) {
      toast.error("please fill all input")
    } else {
      try {
        await report({ house: id, type, description })
        toast.success("report sent successfully")
        setOpen(false)
      } catch (error) {
        toast.error(error.data.message || error.message)
      }
    }
  }

  return (
    <div className="h-screen max-w-4xl mx-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2 className="text-2xl font-semibold text-red-700 my-4">
          {error?.data?.message}
        </h2>
      ) : (
        <div className="flex flex-col md:flex-row -mx-4 w-full">
          <div className=" md:flex-1 px-4  my-4 h-fit shadow-lg">
            <h2 className=" m-2 font-bold text-xl">Renter requests</h2>
            <div className=" rounded-lg  dark:bg-gray-700 mb-4 overflow-auto ">
              <table className="min-w-full h-fit">
                <thead className="bg-white border-b dark:bg-teal-700">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      House
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      rented price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      startDate
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      endDate
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      house status
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
                  {data?.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No RentedHouse
                      </td>
                    </tr>
                  ) : (
                    data?.map((pending, index) => {
                      return (
                        <tr
                          key={pending._id}
                          className={`${
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-zinc-300"
                              : "bg-white dark:bg-slate-400"
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {pending?.houseEntityId?.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.hasCouterOffer
                              ? pending?.counterOfferPrice
                              : pending?.bidPrice}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.startDate}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.endDate}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.houseEntityId?.houseStatus}
                          </td>
                          <td className="text-sm text-gray-900 space-x-2 font-light px-6 py-4 whitespace-nowrap">
                            <Link
                              className=" px-3 py-1 bg-red-500 outline-none text-white border-0 "
                              to={`/houses/detail/${pending?.houseEntityId?._id}`}
                            >
                              Details
                            </Link>
                            {makeAvloading ? (
                              <Loader />
                            ) : (
                              <button
                                className=" px-3 py-1 bg-gray-700 outline-none text-white border-0 "
                                onClick={() =>
                                  makeAvailableHouseHandler(
                                    pending?.houseEntityId?._id
                                  )
                                }
                              >
                                leave
                              </button>
                            )}
                            {reportLoading ? (
                              <Loader />
                            ) : (
                              <button
                                className=" px-3 py-1 bg-gray-700 outline-none text-white border-0 "
                                onClick={() => {
                                  setId(pending?.houseEntityId?._id)
                                  setOpen(true)
                                }}
                              >
                                Report
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            {
              <form className="  flex flex-col px-3  space-y-3">
                <div className="flex  flex-col   mt-4 px-6  ">
                  <label htmlFor="rating" className=" font-semibold text-lg">
                    Type
                  </label>
                  <select
                    value={type}
                    id="rating"
                    onChange={(e) => setType(e.target.value)}
                    className="p-2  border-2 rounded-md border-gray-700 focus:outline-none"
                  >
                    <option value="Maintenance Issue">Maintenance Issue</option>
                    <option value="Noise Complaint">Noise Complaint</option>
                    <option value="Threats or violence">
                      Threats or violence
                    </option>
                    <option value="Failing to make necessary repairs">
                      Failing to make necessary repairs
                    </option>
                    <option value="Illegal activity">Illegal activity</option>
                    <option value="Property damage">Property damage</option>
                    <option value="landlord/broker">landlord/broker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex  flex-col   mt-4 px-6 ">
                  <label htmlFor="comment" className=" font-semibold text-lg">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full outline-none  p-2 h-20 shadow-lg  border-2 border-gray-500 rounded-lg"
                  ></textarea>
                </div>

                {reportLoading ? (
                  <Loader />
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded self-start"
                    type="submit"
                    onClick={(e) => reportHandler(e)}
                  >
                    send report
                  </button>
                )}
              </form>
            }
          </Modal>
        </div>
      )}
    </div>
  )
}

export default RentedHouse
