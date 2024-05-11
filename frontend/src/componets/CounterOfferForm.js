import React, { useState } from "react"
import Loader from "./Loader"
import { toast } from "react-toastify"
import { useProrposeCounterOfferMutation } from "../store/slices/pendingSlice"

const CounterOfferForm = ({ refetch, id }) => {
  const [counterOfferPrice, setCounterOfferPrice] = useState("")
  const [prorposeCounterOffer, { isLoading: counterOfferLoading }] =
    useProrposeCounterOfferMutation()

  const handleCounterOffer = async () => {
    try {
      await prorposeCounterOffer({ id: id, counterOfferPrice })
      toast.success("Counter Offer proposed successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  return (
    <div className="flex">
      <input
        type="number"
        placeholder="counter offer"
        value={counterOfferPrice}
        onChange={(e) => setCounterOfferPrice(e.target.value)}
        className="border-2 border-gray-500 p-2 rounded-md"
      />
      <button
        className="bg-green-500 text-white p-2 rounded-md"
        onClick={handleCounterOffer}
      >
        {counterOfferLoading ? <Loader /> : "Send Offer"}
      </button>
    </div>
  )
}

export default CounterOfferForm
