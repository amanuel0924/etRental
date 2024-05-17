import React, { useState, useEffect } from "react"
import ProfileCard from "../componets/ProfileCard"
import { Modal } from "../componets/Modal"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../store/slices/userApiSlice"
import Loader from "../componets/Loader"
import { logout } from "../store/slices/authSlice"
import {
  useLogoutMutation,
  useDeleteProfileMutation,
} from "../store/slices/userApiSlice"
import { useDispatch } from "react-redux"

const Profile = () => {
  const [open, setOpen] = useState(false)
  const [deleteModal, setDelete] = useState(false)
  const { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [images, setImages] = useState("")
  const formData = new FormData()
  const { data, error, isLoading, refetch } = useGetProfileQuery(id)
  const [updateUser, { isLoading: loading }] = useUpdateProfileMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deleteUser, { isLoading: deleteloading }] = useDeleteProfileMutation()
  const [logoutUser] = useLogoutMutation()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImages(file)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !images) {
      toast.error("please fill all input")
    } else {
      try {
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("password", password)
        formData.append("image", images || data?.image)

        await updateUser(formData).unwrap()
        toast.success("user updated successfully")
        setOpen(false)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    }
  }

  const deleteProfileHandler = async () => {
    try {
      await deleteUser().unwrap()
      await logoutUser().unwrap()
      dispatch(logout())
      toast.success("Logout successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error.data.message || error.message)
    }
  }

  useEffect(() => {
    if (data) {
      setName(data?.name)
      setEmail(data?.email)
      setPhone(data?.phoneNumber)
    }
  }, [data])
  console.log(data)

  return (
    <div className="flex flex-col w-full h-screen  items-center  ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1> ? (
          data?.users?.length === 0
        ) : (
          <div>User not found</div>
        )
      ) : (
        <>
          <div className="w-fit">
            <ProfileCard data={data} />
          </div>
          <div className=" space-x-4 space-y-4 ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => setDelete(true)}
            >
              delete Profile
            </button>
          </div>
        </>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        {
          <form className="  flex flex-col px-3  space-y-3">
            <input
              type="text"
              placeholder="name"
              className="w-full p-1 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="email"
              className="w-full p-1 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="phone number"
              className="w-full p-1 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-gray-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="w-full p-1 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="file"
              placeholder="choose file...."
              className="w-full p-1 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-gray-500"
              onChange={(e) => handleFileChange(e)}
            />

            {loading ? (
              <Loader />
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded self-start"
                type="submit"
                onClick={(e) => updateHandler(e)}
              >
                Update
              </button>
            )}
          </form>
        }
      </Modal>
      <Modal open={deleteModal} onClose={() => setDelete(false)}>
        <div className="flex flex-col items-center  justify-center">
          <h1 className="text-xl font-bold text-red-500">
            Are you sure you want to delete this profile?
          </h1>
          <div className="flex gap-4 mt-3">
            {deleteloading ? (
              <Loader />
            ) : (
              <button
                className="bg-red-500 w-full  text-white px-3 py-1 rounded-lg"
                onClick={deleteProfileHandler}
              >
                Delete
              </button>
            )}
            <button
              className="bg-gray-300 w-full text-white px-3 py-1 rounded-lg"
              onClick={() => setDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Profile
