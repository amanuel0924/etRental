import React, { useState } from "react"
import Loader from "./../../componets/Loader"
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "./../../store/slices/userApiSlice"
import { FaEdit, FaTrashAlt, FaRegEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Modal } from "./../../componets/Modal"
import { useParams } from "react-router-dom"
import Paginate from "../../componets/Paginate"

function Users() {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const { pageNumber, keyword } = useParams()
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({
    pageNumber,
    keyword,
  })
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()

  const handeleDeleteClick = async (id) => {
    try {
      await deleteUser(id).unwrap()
      setOpen(false)
      toast.success("user deleted successfully")
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }

  return (
    <div className=" flex flex-col justify-between h-[85%] items-center   ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1> ? (
          data?.users?.length === 0
        ) : (
          <div>user not found</div>
        )
      ) : (
        <div className="flex flex-col dark:bg-gray-700 flex-1 mt-3 w-full  ">
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium dark:text-gray-900 text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          className="odd:bg-white even:bg-gray-100 dark:even:bg-zinc-400 dark:odd:bg-zinc-200 "
                        >
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                            {item.name}
                          </td>
                          <td className="px-6 py-3  text-sm text-gray-800">
                            {item.email}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-end text-sm font-medium space-x-3">
                            <Link
                              to={`/#`}
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent dark:text-zinc-800 text-yellow-500 hover:text-yellow-700 disabled:opacity-50 disabled:pointer-events-none hover:scale-110 "
                            >
                              <FaEdit size={20} />{" "}
                            </Link>
                            <Link
                              to={`/#`}
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent dark:text-zinc-800 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none  hover:scale-110"
                            >
                              <FaRegEye size={23} />
                            </Link>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent dark:text-zinc-800 text-red-400 hover:text-red-600 disabled:opacity-50 disabled:pointer-events-none  hover:scale-110"
                              onClick={() => {
                                setId(item._id)
                                setOpen(true)
                              }}
                            >
                              <FaTrashAlt size={20} />
                            </button>
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
      {data?.page && data?.pages && !keyword && (
        <div className=" ">
          <Paginate page={data.page} pages={data.pages} />
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center  justify-center">
          <h1 className="text-xl font-bold text-red-500">
            Are you sure you want to delete this file?
          </h1>
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => handeleDeleteClick(id)}
              className="bg-red-500 w-full  text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 w-full text-white px-3 py-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Users
