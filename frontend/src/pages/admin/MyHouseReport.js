import React from "react"
import Loader from "./../../componets/Loader"
import { toast } from "react-toastify"
import {
  useGetMyHouseReportsQuery,
  useResolveReportMutation,
} from "./../../store/slices/reportApisclice"

import { useParams } from "react-router-dom"
import Paginate from "../../componets/Paginate"

function MyHouseReport() {
  const { pageNumber, keyword } = useParams()
  const { data, error, isLoading, refetch } = useGetMyHouseReportsQuery({
    pageNumber,
    keyword,
  })
  const [resolveReport, { isLoading: resolveLoading }] =
    useResolveReportMutation()

  const resolveHandler = async (id) => {
    try {
      await resolveReport(id).unwrap()
      toast.success("Report resolved successfully")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }

  return (
    <div className=" flex flex-col justify-between h-[85%] items-center   ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error?.data?.message || error?.message}</h1>
      ) : data?.reports?.length === 0 ? (
        <div>Report not found</div>
      ) : (
        <div className="flex flex-col dark:bg-gray-700 flex-1 mt-3 w-full   ">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle  ">
              <div className="overflow-hidden rounded-lg ">
                <table className="min-w-full divide-y  divide-gray-200   ">
                  <thead className="dark:bg-teal-700  ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900  text-gray-500 uppercase"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        House
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.reports.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          className="odd:bg-white even:bg-gray-100 dark:even:bg-zinc-400 dark:odd:bg-zinc-200 "
                        >
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                            {item.type}
                          </td>
                          <td className="px-6 py-3  text-sm text-gray-800">
                            {item.description}
                          </td>
                          <td className="px-6 py-3  text-sm text-gray-800">
                            {item.house}
                          </td>
                          <td className="px-6 py-3  text-sm text-gray-800">
                            {item.status}
                          </td>
                          <td className="px-6 py-3  text-sm text-gray-800">
                            {resolveLoading ? (
                              <Loader />
                            ) : (
                              <button
                                className="bg-gray-500 text-white p-1 rounded-md"
                                onClick={() => resolveHandler(item._id)}
                              >
                                Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {data?.reports?.length > 0 && data?.page && data?.pages && !keyword && (
        <div className=" ">
          <Paginate
            page={data.page}
            pages={data.pages}
            link="/dashboard/my-reports"
          />
        </div>
      )}
    </div>
  )
}

export default MyHouseReport
