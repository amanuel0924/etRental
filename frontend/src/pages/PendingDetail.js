import React from "react"
import Loader from "../componets/Loader"
import { toast } from "react-toastify"
import {
  useGetSinglePendingQuery,
  useAcceptRenterMutation,
  useRejectRenterMutation,
  useAcceptCounterOfferMutation,
  useRejectCounterOfferMutation,
} from "../store/slices/pendingSlice"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CounterOfferForm from "../componets/CounterOfferForm"
import CardHome from "../componets/CardHome"

const PendingDetail = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.auth.user)
  const { data, isLoading, error, refetch } = useGetSinglePendingQuery(id)
  const [acceptRenter, { isLoading: acceptLoading }] = useAcceptRenterMutation()
  const [rejectRenter, { isLoading: rejectLoading }] = useRejectRenterMutation()
  const [acceptCounterOffer, { isLoading: acceptCounterLoading }] =
    useAcceptCounterOfferMutation()
  const [rejectCounterOffer, { isLoading: rejectCounterLoading }] =
    useRejectCounterOfferMutation()

  const handleAccept = async () => {
    try {
      await acceptRenter(id)
      toast.success("Renter accepted successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  const handleReject = async () => {
    try {
      await rejectRenter(id)
      toast.success("Renter rejected successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  const handleAcceptCounterOffer = async () => {
    try {
      await acceptCounterOffer(id)
      toast.success("Counter Offer accepted successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  const handleRejectCounterOffer = async () => {
    try {
      await rejectCounterOffer(id)
      toast.success("Counter Offer rejected successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className=" h-screen w-full ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2 className="text-2xl font-semibold text-red-700 my-4">
          {error?.data?.message}
        </h2>
      ) : (
        <div className="w-full h-full flex flex-col ">
          {(user.role === "landlord" || user.role === "broker") && (
            <div className="bg-white overflow-hidden shadow rounded-lg border h-fit ">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pending Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.tenetId?.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.tenetId?.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.tenetId?.phone || "09090909090"}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      123 Main St
                      <br />
                      Anytown, USA 12345
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {user.role === "renter" && <CardHome data={data?.houseEntityId} />}
          <div className="flex bg-white overflow-hidden shadow rounded-lg border h-fit justify-between p-4 mt-2 ">
            <div className="flex flex-col">
              <p>status</p>
              <p>{data?.status}</p>
            </div>
            <div className="flex flex-col">
              <p>bid</p>
              <p>{data?.bidPrice}</p>
            </div>
            <div className="flex flex-col">
              <p>start date</p>
              <p>{data?.startDate}</p>
            </div>
            <div className="flex flex-col">
              <p>end date</p>
              <p>{data?.endDate}</p>
            </div>
          </div>

          {data?.status === "pending" &&
            (user.role === "landlord" || user.role === "broker") && (
              <div className="flex bg-white overflow-hidden shadow rounded-lg border h-fit space-x-2 p-4 mt-2 ">
                <button
                  className="bg-green-500 text-white p-2 rounded-md"
                  onClick={handleAccept}
                >
                  {acceptLoading ? <Loader /> : "Accept"}
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md "
                  onClick={handleReject}
                >
                  {rejectLoading ? <Loader /> : "Reject"}
                </button>
                <CounterOfferForm refetch={refetch} id={id} />
              </div>
            )}

          {data?.status === "counterOffer" && user?.role === "renter" && (
            <div className="flex">
              <div>
                <p>counter offer price</p>
                <p>{data?.counterOfferPrice}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white p-2 rounded-md"
                  onClick={handleAcceptCounterOffer}
                >
                  {acceptCounterLoading ? <Loader /> : "Accept"}
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md"
                  onClick={handleRejectCounterOffer}
                >
                  {rejectCounterLoading ? <Loader /> : "Reject"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PendingDetail
