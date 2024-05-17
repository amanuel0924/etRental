import React from "react"

const CommingSoonCard = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2  my-10">
      <img
        className="h-48 w-full object-cover object-end"
        src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
        alt="Home in Countryside"
      />
      <div className="p-6">
        <div className="flex items-baseline">
          <span className="inline-block bg-blue-100 text-blue-600 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            coming soon
          </span>
        </div>
        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
          Beautiful Home in the countryside
        </h4>
        <div className="mt-1">
          <span>$1,900.00</span>
          <span className="text-gray-600 text-sm">/ wk</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-teal-600 font-semibold">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
          </span>
          <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
        </div>
      </div>
    </div>
  )
}

export default CommingSoonCard
