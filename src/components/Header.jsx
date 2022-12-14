import React from 'react'
import {AiOutlineSchedule} from 'react-icons/ai'
const Header = () => {
  return (
    <div className='p-5 flex row justify-between bg-blue-800 mb-4'>
        <div 
        className='shadow-xl bg-blue-700 py-2 px-6 rounded-full text-2xl bold text-white flex'
        >
            <h1>
                My Task Scheduler
            </h1>
            <h1 className='py-1 ml-1'><AiOutlineSchedule/></h1>
        </div>
        <div className='text-white'>
            <p>Task Scheduler Application all rights reserved 2022 &reg;</p>
        </div>
    </div>
  )
}

export default Header