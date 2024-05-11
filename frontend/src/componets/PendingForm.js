import React, { useState } from "react"
import Loader from "./Loader"
import { toast } from "react-toastify"
import { useCreatePendingMutation } from "../store/slices/pendingSlice"

const PendingForm = ({ id }) => {
  const [createPending, { isLoading }] = useCreatePendingMutation()
  const [bidPrice, setBidPrice] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const handlePendingRequest = async (e) => {
    e.preventDefault()
    try {
      await createPending({
        houseEntityId: id,
        bidPrice: bidPrice,
        startDate: startDate,
        endDate: endDate,
      }).unwrap()
      toast.success("offer sent successfully")
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal-700 dark:text-white mb-2">
        send offer
      </h2>
      <form>
        <div className="flex flex-col space-y-2">
          <label htmlFor="bidPrice">Bid Price</label>
          <input
            type="text"
            name="bidPrice"
            id="bidPrice"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
            className="border-2 border-gray-500 rounded-md focus:outline-none px-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-2 border-gray-500 rounded-md focus:outline-none px-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-2 border-gray-500 rounded-md focus:outline-none px-2"
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <button
            onClick={handlePendingRequest}
            className="bg-teal-500 text-white rounded-md px-4 py-2"
          >
            Send Offer
          </button>
        )}
      </form>
    </div>
  )
}

export default PendingForm
