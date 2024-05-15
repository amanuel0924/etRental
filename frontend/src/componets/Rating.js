import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa"

function renderStar(value) {
  if (value >= 1) {
    return <FaStar />
  } else if (value >= 0.5) {
    return <FaStarHalf />
  } else {
    return <FaRegStar />
  }
}

const Rating = ({ value, text }) => {
  return (
    <div className="rating flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} className="text-yellow-400">
          {renderStar(value - index + 1)}
        </span>
      ))}
      <span className="rating-text text-xs font-semibold ml-2">
        {text && text}
      </span>
    </div>
  )
}

export default Rating
