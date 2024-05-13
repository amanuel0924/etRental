import { FaRegEnvelope, FaRegHeart } from "react-icons/fa"

const BtbCard = () => {
  return (
    <div className=" side-card px-4 ">
      <div className="side-card-header text-center ">
        <button className="side-button ">
          <FaRegEnvelope />
          <span>Create email alert</span>
        </button>
        <button className="side-button">
          <FaRegHeart />
          <span>Save this search</span>
        </button>
      </div>
      <div className=" links font-medium  ">
        <a href="/#">Draw your search</a>
        <a href="/#">Save Search & alerts</a>
      </div>
    </div>
  )
}

export default BtbCard
