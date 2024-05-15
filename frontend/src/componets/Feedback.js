import React, { useState } from "react"
import { useCreateFeedbackMutation } from "../store/slices/houseApiSlice"
import { toast } from "react-toastify"
import Loader from "./Loader"
import Rating from "./Rating"
import dateFormater from "../utility/dateFormater"
import { useSelector } from "react-redux"

const Feedback = ({ refetch, feedbacks, id }) => {
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")

  const [createFeedback, { isLoading: loading }] = useCreateFeedbackMutation()

  const createFeedbackHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createFeedback({
        id,
        rating: rating,
        comment: comment,
      }).unwrap()
      toast.success("feedback created")
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.message)
    }
  }

  return (
    <div className=" shadow-lg p-3 ">
      <h2 className="text-2xl font-bold text-teal-700 dark:text-white mb-2">
        feedbacks
      </h2>

      <form className="">
        <div className="flex  flex-col   mt-4 px-6  ">
          <label htmlFor="rating" className=" font-semibold text-lg">
            Rating
          </label>
          <select
            value={rating}
            id="rating"
            onChange={(e) => setRating(e.target.value)}
            className="p-2  border-2 rounded-md border-gray-700 focus:outline-none"
          >
            <option>select... </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="flex  flex-col   mt-4 px-6 ">
          <label htmlFor="comment" className=" font-semibold text-lg">
            comment
          </label>
          <textarea
            name="comment"
            required
            id="coment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full outline-none  p-2 h-20 shadow-lg  border-2 border-gray-500 rounded-lg"
          ></textarea>
        </div>
        <div className="flex  flex-col   mt-4 px-6">
          {loading ? (
            <Loader />
          ) : (
            <button
              className="py-2 my-1 px-4 shadow-xl self-start md:px-12 text-white text-center bg-teal-800 rounded-lg w-fit hover:scale-105 duration-200 hover:shadow-xl "
              onClick={createFeedbackHandler}
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div className="flex m-2 px-6 flex-col items-center ">
        {feedbacks?.length === 0 && <h1> No feedback</h1>}
        {feedbacks?.map((feed) => {
          return (
            <div key={feed._id} className=" w-full border-y-2 ">
              <div className="flex space-x-3">
                <p className=" font-bold">{feed.renter.name}:</p>{" "}
                <span className=" italic">{feed.comment}</span>{" "}
                <Rating value={feed.rating} />
              </div>
              <div className="flex space-x-3">
                <p className=" text-xs">{dateFormater(feed.createdAt)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Feedback
