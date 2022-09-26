import React from 'react'
import { useState } from 'react';
import TimelineDaily from './TimelineDaily';
import TimelineHourly from './TimelineHourly';


const Timeline = ({loadedTasks}) => {

    const [isHourly, setIsHourly] = useState(false)

    const handleRadio = (bool) => {
      setIsHourly(bool)
    }

    return (
      <>
        <h1 className='text-center text-2xl pb-2 pt-5'>Timeline</h1>
        <div 
          className='bg-slate-700 text-lg flex justify-center py-1 pb-2
          text-white font-light outline outline-blue-500 outline-1'
          >
            <div className='px-3 flex flex-col'>
              <label>Daily</label>
              <input
                type="radio" 
                name="timeline"
                onClick={()=>{handleRadio(false)}}
              />

            </div>
            <div className='px-3 flex flex-col'> 
              <label>Hourly</label>
              <input
                type="radio" 
                name="timeline" 
                onClick={()=>{handleRadio(true)}}
              />
            </div>
        </div>

        {isHourly
        ?(
          <div>
            <TimelineHourly loadedTasks={loadedTasks}/>
          </div>
        )
        : (
          <div>
            <TimelineDaily loadedTasks={loadedTasks}/>
          </div>
        )
        }
      </>
    )
}

export default Timeline