import React from "react"
import Loader from "../../componets/Loader"
import { toast } from "react-toastify"
import {
  useGetAllPendingQuery,
  useAcceptRenterMutation,
  useRejectRenterMutation,
} from "../../store/slices/pendingSlice.js"
import { Link } from "react-router-dom"

const PendingRequest = () => {
  const { data, isLoading, error, refetch } = useGetAllPendingQuery()
  const [acceptRenter, { isLoading: acceptLoading }] = useAcceptRenterMutation()
  const [rejectRenter, { isLoading: rejectLoading }] = useRejectRenterMutation()

  const handleAccept = async (id) => {
    try {
      await acceptRenter(id)
      toast.success("Renter accepted successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  const handleReject = async (id) => {
    try {
      await rejectRenter(id)
      toast.success("Renter rejected successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <>
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
                      Renter
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      bid
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
                      status
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
                        No request
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
                            {pending?.tenetId.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.bidPrice}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.startDate}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.endDate}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {pending?.status}
                          </td>
                          <td className="text-sm text-gray-900 space-x-2 font-light px-6 py-4 whitespace-nowrap">
                            <button
                              className=" px-3 py-1 bg-teal-800 outline-none text-white border-0 "
                              onClick={() => handleAccept(pending?._id)}
                              disabled={
                                pending.status === "rejected" ||
                                pending.status === "accepted" ||
                                pending.status === "couterOffer"
                              }
                            >
                              {acceptLoading ? <Loader /> : "accept"}
                            </button>
                            <button
                              className=" px-3 py-1 bg-red-500 outline-none text-white border-0 "
                              onClick={() => handleReject(pending?._id)}
                              disabled={
                                pending.status === "rejected" ||
                                pending.status === "accepted" ||
                                pending.status === "couterOffer"
                              }
                            >
                              {rejectLoading ? <Loader /> : "reject"}
                            </button>
                            <Link
                              className=" px-3 py-1 bg-red-500 outline-none text-white border-0 "
                              to={`/dashboard/pending/${pending._id}`}
                            >
                              Details
                            </Link>
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
    </>
  )
}

export default PendingRequest
