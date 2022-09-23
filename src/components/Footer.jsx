import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='bg-blue-500 w-full flex justify-center items-center text-white flex-col'>
        <p className='text-xl p-2'>Export all tasks</p>
        <div className=' p-3 flex flex-row justify-between'>
          <button className='mr-5 p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors'>Export CSV</button>
          <button className='ml-5 p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors'>Export PDF</button>
        </div>
      </div>
    </div>
  )
}

export default Footer