import React from 'react'
import { useState } from 'react';
import TimelineDaily from './TimelineDaily';
import TimelineHourly from './TimelineHourly';


const Timeline = ({workHours, loadedTasks, capacity}) => {

    const [isHourly, setIsHourly] = useState(false)

    const handleRadio = (bool) => {
      setIsHourly(bool)
    }

    return (
      <div id="timelineID">
        <div
          className='bg-slate-700 text-lg flex justify-center
          text-white font-light '
          >
            <div className='px-3 flex flex-row'>
              <label className='px-2'>
                Daily
              </label>
              <input
                type="radio" 
                name="timeline"
                onClick={()=>{handleRadio(false)}}
              />

            </div>
            <div className='px-3 flex flex-row'> 
              <label className='px-2'>
                Hourly
              </label>
              <input
                type="radio" 
                name="timeline" 
                onClick={()=>{handleRadio(true)}}
              />
            </div>
        </div>

        {isHourly
        ? (
          <div>
            <TimelineHourly 
              loadedTasks={loadedTasks}
              capacity={capacity}
              workHours={workHours}
            />
          </div>
        )
        : (
          <div>
            <TimelineDaily loadedTasks={loadedTasks} capacity={capacity}/>
          </div>
        )
        }
      </div>
    )
}

export default Timeline