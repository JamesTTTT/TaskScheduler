import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='bg-blue-500 w-full h-20 flex justify-center items-center text-white flex-col'>
        <h1 className='text-3xl font-bold'>
            Footer
        </h1>
        <p>Task Scheduler Application all rights reserved 2022 &reg;</p>
        {/* <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul> */}
      </div>
    </div>
  )
}

export default Footer