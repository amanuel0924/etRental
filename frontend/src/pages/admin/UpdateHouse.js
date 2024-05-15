import React, { useState, useEffect } from "react"
import Loader from "../../componets/Loader"
import { toast } from "react-toastify"
import {
  useGetSingleHouseQuery,
  useUpdateHouseMutation,
} from "./../../store/slices/houseApiSlice"
import { useParams, useNavigate } from "react-router-dom"

const UpdateHouse = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [siteLocation, setSiteLocation] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")
  const [images, setImages] = useState([])
  const formData = new FormData()
  const { id } = useParams()
  const navigate = useNavigate()

  const [updateHouse, { isLoading }] = useUpdateHouseMutation()
  const {
    data,
    error,
    isLoading: loading,
    refetch,
  } = useGetSingleHouseQuery(id)
  console.log(data)

  const handleFileChange = (e) => {
    const file = e.target.files
    if (file) {
      setImages(file)
    } else {
      toast.error("you can only upload 3 images")
      setImages([])
    }
  }
  const onsubmitHandler = async (e) => {
    e.preventDefault()

    if (
      images &&
      description &&
      name &&
      price &&
      siteLocation &&
      category &&
      type
    ) {
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i])
      }
      formData.append("description", description)
      formData.append("name", name)
      formData.append("price", price)
      formData.append("siteLocation", siteLocation)
      formData.append("category", category)
      formData.append("type", type)

      try {
        await updateHouse({ id, formData }).unwrap()
        toast.success("house updated successfully")
        refetch()
        navigate("/dashboard/my-houses")
      } catch (error) {
        toast.error(error.data.message || error.message)
      }
    } else {
      toast.error("please fill all fields")
    }
  }

  useEffect(() => {
    if (data) {
      setName(data.name)
      setPrice(data.price)
      setSiteLocation(data.siteLocation)
      setDescription(data.description)
      setCategory(data.category)
      setType(data.type)
    }
  }, [data])

  return (
    <div className=" h-full ">
      {loading ? (
        <Loader />
      ) : error ? (
        <h1 className=" bg-red-100 w-full p-2 text-sm border-2 border-red-800">
          {error.data.message || error.message}
        </h1>
      ) : (
        <div className="bg-gray-100 h-full overflow-scroll  dark:bg-gray-900">
          <div className="w-full max-w-3xl mx-auto p-8">
            <form
              onSubmit={onsubmitHandler}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700"
            >
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Create House
              </h1>

              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="price"
                      value={price}
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="site_location"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Site Location
                  </label>
                  <input
                    type="text"
                    id="site_location"
                    value={siteLocation}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    onChange={(e) => setSiteLocation(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    value={description}
                    className="w-full rounded-lg border py-2 px-3  dark:bg-gray-700 dark:text-white dark:border-none h-24"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="catagory"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Catagory
                    </label>
                    <select
                      type="text"
                      id="catagory"
                      value={category}
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="apartment">apartment</option>
                      <option value="villa">villa</option>
                      <option value="condominium">condominium</option>
                      <option value="service">service</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Type
                    </label>
                    <select
                      type="text"
                      id="type"
                      value={type}
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="one-bedroom">one-bedroom</option>
                      <option value="two-bedroom">two-bedroom</option>
                      <option value="three-bedroom">three-bedroom</option>
                      <option value="studio">studio</option>
                      <option value="single">single</option>
                      <option value="G+1">G+1</option>
                      <option value="G+2">G+2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <label
                    htmlFor="images"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Images
                  </label>
                  <input
                    type="file"
                    id="images"
                    multiple
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    placeholder="choose images...."
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className=" bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-950 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
                  >
                    Update House
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateHouse
