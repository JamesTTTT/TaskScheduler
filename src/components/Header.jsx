import React from 'react'

const Header = () => {
  return (
    <div className='p-5 flex row justify-between bg-slate-200'>
        <div>
            <h1 className='text-2xl bold'>
                Task Scheduler
            </h1>
        </div>
        <div>
            <p>TaskSched application 2022 all rights reserved</p>
        </div>
    </div>
  )
}

export default Header