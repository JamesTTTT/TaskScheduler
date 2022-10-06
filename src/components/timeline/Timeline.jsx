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
            <input
                type="radio" 
                id="daily"
                name="timeline"
                className='hidden peer'
                onClick={()=>{handleRadio(false)}}
              />
              <label 
                className='px-2 peer-checked:text-blue-400 peer-checked:underline
                hover:text-blue-200' 
                for="daily">
                Daily
              </label>


            </div>
            <div className='px-3 flex flex-row'>
              <input
                  type="radio" 
                  name="timeline" 
                  id="hourly"
                  className='hidden peer'
                  onClick={()=>{handleRadio(true)}}
                />
              <label 
                className='px-2 peer-checked:text-blue-400 peer-checked:underline
                hover:text-blue-200' 
                for="hourly">
                Hourly
              </label>

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