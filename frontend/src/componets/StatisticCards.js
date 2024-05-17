import React from "react"
import { useGetAlluserbyRolestatsticQuery } from "../store/slices/userApiSlice"
import { useGetPendingGroupByStatusQuery } from "../store/slices/pendingSlice"
import { useGetHouseCountByStatusQuery } from "../store/slices/houseApiSlice"
import Loader from "./Loader"
import { HiOutlineOfficeBuilding } from "react-icons/hi"

const StatisticsCard = () => {
  const { data, error, isLoading } = useGetAlluserbyRolestatsticQuery()
  const {
    data: pendingData,
    error: pendingError,
    isLoading: pendingIsLoading,
  } = useGetPendingGroupByStatusQuery()
  const {
    data: houseData,
    error: houseError,
    isLoading: houseIsLoading,
  } = useGetHouseCountByStatusQuery()
  if (data) {
    console.log(data)
  }
  return (
    <div id="24h">
      <h1 className="font-bold py-4 uppercase">Total Statistics</h1>
      <div
        id="stats"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="bg-black/60 to-white/5 p-6 rounded-lg flex flex-col">
          <div className="flex flex-row space-x-4 items-center border-b border-gray-400 pb-3 ">
            <div id="stats-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                Users
              </p>
              <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                <span>
                  +{" "}
                  {data?.reduce((acc, item) => {
                    return acc + item.count
                  }, 0)}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-indigo-300 text-center">
            {data?.map((item) => (
              <div key={item._id}>
                <p className=" font-bold">{item._id}</p>
                <p className="">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black/60 p-6 rounded-lg">
          <div className="flex flex-row space-x-4 items-center  border-b border-gray-400 pb-3 ">
            <div id="stats-1">
              <HiOutlineOfficeBuilding color="white" size={36} />
            </div>
            <div>
              <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                Houses
              </p>
              <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                <span>
                  +{" "}
                  {houseData?.reduce((acc, item) => {
                    return acc + item.count
                  }, 0)}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-teal-300 text-center">
            {houseData?.map((item) => (
              <div key={item._id}>
                <p className=" font-bold">{item._id}</p>
                <p className="">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black/60 p-6 rounded-lg">
          <div className="flex flex-row space-x-4 items-center  border-b border-gray-400 pb-3 ">
            <div id="stats-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-blue-300 text-sm font-medium uppercase leading-4">
                Requests
              </p>
              <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                <span>
                  {"+"}
                  {pendingData?.reduce((acc, item) => {
                    return acc + item.count
                  }, 0)}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-teal-300 text-center">
            {pendingData?.map((item) => (
              <div key={item._id}>
                <p className=" font-bold">{item._id}</p>
                <p className="">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsCard
