import React from "react"
import { Linklists } from "./Linklists"

const ListContainer = () => {
  const linsks1 = [
    "All house for sale in oxford",
    "1 bade room house for sale",
    "2 bade room house for sale",
    "3 bade room house for sale",
  ]
  return (
    <div className="side-card">
      <div className="side-card-header  px-2 text-lg">
        Currently available for sale in Oxford
      </div>
      <Linklists data={linsks1} />
      <Linklists data={linsks1} />
      <Linklists data={linsks1} />
    </div>
  )
}

export default ListContainer
