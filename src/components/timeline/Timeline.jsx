import React from 'react'
import TimelineDaily from './TimelineDaily';

const Timeline = ({loadedTasks}) => {

    return (
      <>
        <h1 className='text-center text-2xl'>Timeline</h1>
        <div 
          className='bg-slate-700 text-lg flex justify-center py-1
          text-white font-light outline outline-blue-500 outline-1'
          >
            <div className='px-1 flex flex-col'>
              <label>Daily</label>
              <input
                className='bg-gray-100'
                type="radio" 
                name="timeline" 
                checked
              />

            </div>
            <div className='px-1 flex flex-col'> 
              <label>Hourly</label>
              <input
                className='bg-gray-100'
                type="radio" 
                name="timeline" 
                checked
              />
            </div>
        </div>

        <div>
          <TimelineDaily loadedTasks={loadedTasks}/>
        </div>
      </>
    )
}

export default Timeline