import React from 'react'
import { useState, useEffect } from 'react';
import TimelineDaily from './TimelineDaily';
import TimelineHourly from './TimelineHourly';
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi'
import ReactTooltip from 'react-tooltip';

const Timeline = ({workHours, loadedTasks, capacity, ocpHours, isOptimized, setIsOptimized}) => {

    const [isHourly, setIsHourly] = useState(false)
    const [renderYear, setRenderYear] = useState(0)

    useEffect(() => {
      setRenderYear(thisYear())
    }, [])
    

    const handleRadio = (bool) => {
      setIsHourly(bool)
    }

    const nextYear = () =>{
      let nextYear = renderYear +1
      if(nextYear <= thisYear()+10){
        setRenderYear(nextYear)
      }
    }

    const lastYear = () =>{
      let lastYear = renderYear -1
      if(lastYear >= thisYear()-10){
        setRenderYear(lastYear)
      }
    }

    const thisYear = () =>{
      return new Date().getFullYear()
    }

    return (
      <div id="timelineID">
        <div
          className='bg-slate-700 text-lg flex
          text-white font-light justify-between w-full'
          >
            <div 
              data-tip 
              data-for='optimize'
              className='pt-1 pl-3'>
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
            
            <div className='w-full flex justify-end p-1'>
                <button
                  onClick={()=>{lastYear()}}
                >
                <div className='px-3 text-2xl hover:text-blue-300 transition-colors'>
                  <BiLeftArrow/>
                </div>
              </button>
                <span className='text-2xl'>
                  {renderYear}
                </span>
                <button
                  onClick={()=>{nextYear()}}
                >
                  <div className='px-3 text-2xl hover:text-blue-300 transition-colors'>
                    <BiRightArrow/>
                  </div>
                </button>
              </div>

            <div className='flex w-full justify-end'>
              <div className='px-3 flex flex-row bg-slate-600 pt-1 rounded-l-md'>
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
              <div className='px-3 flex flex-row bg-slate-600 pt-1'>
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
        <ReactTooltip id='optimize' type='dark' effect='solid'>
          <span className='text-md'>
            Prioritize tasks with nearest deadline
          </span>
        </ReactTooltip> 

        {isHourly
        ? (
          <div>
            <TimelineHourly 
              loadedTasks={loadedTasks}
              capacity={capacity}
              workHours={workHours}
              ocpHours={ocpHours}
              renderYear={renderYear}
            />
          </div>
        )
        : (
          <div>
            <TimelineDaily 
              loadedTasks={loadedTasks}
              capacity={capacity}
              ocpHours={ocpHours}
              renderYear={renderYear}
              />
          </div>
        )
        }
      </div>
    )
}

export default Timeline