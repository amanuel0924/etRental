import React from "react"
import Loader from "../componets/Loader"
import { Link, useParams } from "react-router-dom"
import Paginate from "../componets/Paginate"
import { useGetAllHouseQuery } from "../store/slices/houseApiSlice"
import CardHome from "../componets/CardHome"
import ListContainer from "./../componets/mock/ListContainer"
import Btncard from "./../componets/mock/BtbCard"

const HouseList = () => {
  const { pageNumber, keyword } = useParams()
  const { data, error, isLoading } = useGetAllHouseQuery({
    pageNumber,
    keyword,
  })

  console.log(data)

  return (
    <div className="flex flex-col  justify-between  items-center ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1 className="text-red-500">{error}</h1> ? (
          data?.houses?.length === 0
        ) : (
          <div>House not found</div>
        )
      ) : (
        <div className="flex">
          <div className="flex flex-col flex-1 h-fit bg-[#F7F6F5] p-2  md:p-10 space-y-5 ">
            {data?.houses?.map((house) => (
              <CardHome key={house._id} house={house} />
            ))}
          </div>
          <div className="bg-[#F7F6F5] p-4  hidden lg:flex lg:flex-col md:space-y-10">
            <Btncard />
            <ListContainer />
          </div>
        </div>
      )}
      {data?.page && data?.pages && !keyword && (
        <div className=" ">
          <Paginate page={data.page} pages={data.pages} link="/houses" />
        </div>
      )}
    </div>
  )
}

export default HouseList
