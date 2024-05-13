import React from "react"

export const Linklists = (props) => {
  return (
    <div className=" links px-2 text-sm  border-b-3 ">
      {props.data.map((items, index) => (
        <a href="/#" key={index}>
          {items}
        </a>
      ))}
    </div>
  )
}
