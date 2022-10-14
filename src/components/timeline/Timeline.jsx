import React from 'react'
import { useState } from 'react';
import TimelineDaily from './TimelineDaily';
import TimelineHourly from './TimelineHourly';


const Timeline = ({workHours, loadedTasks, capacity, ocpHours, isOptimized, setIsOptimized}) => {

    const [isHourly, setIsHourly] = useState(false)

    const handleRadio = (bool) => {
      setIsHourly(bool)
    }

    return (
      <div id="timelineID">
        <div
          className='bg-slate-700 text-lg flex
          text-white font-light'
          >
            <div className='pt-1 pl-3'>
              <label for="checked-toggle" className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="checked-toggle" 
                  className="sr-only peer"
                  checked={isOptimized}
                  onChange={(e)=>{
                    setIsOptimized(e.target.checked)
                    console.log()
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer
                 dark:bg-gray-500 peer-checked:after:translate-x-full after:content-['']
                  after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                </div>
                
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Optimize</span>
              </label>
            </div>
            <div className='flex justify-center w-full pt-1'>
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
        </div>

        {isHourly
        ? (
          <div>
            <TimelineHourly 
              loadedTasks={loadedTasks}
              capacity={capacity}
              workHours={workHours}
              ocpHours={ocpHours}
            />
          </div>
        )
        : (
          <div>
            <TimelineDaily 
              loadedTasks={loadedTasks}
              capacity={capacity}
              ocpHours={ocpHours}
              />
          </div>
        )
        }
      </div>
    )
}

export default Timeline