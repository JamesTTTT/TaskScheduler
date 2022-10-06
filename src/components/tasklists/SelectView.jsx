import React from 'react'
import {BsList} from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'
import JumpToTimelineBtn from '../timeline/JumpToTimelineBtn';

const SelectView = ({updateView,timelineComp}) => {
  return (
    <div>
        <div 
          className='text-lg p-3 flex justify-center font-light text-white'
          >
            <div className='p-1 flex flex-row bg-slate-700 rounded-l-xl'>
              <input
                type="radio" 
                name="select"
                className='peer hidden'
                id="select-radio-1"
                onChange={()=>{updateView(true)}}
              />
              <label
                for="select-radio-1"
                className='p-2 text-2xl peer-checked:text-blue-400'>
                <FaBoxes/>
              </label>

            </div>
            <div className='px-1 flex flex-row bg-slate-700 rounded-r-xl'> 

              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-2"
                onChange={()=>{updateView(false)}}/>
              <label 
                for="select-radio-2"
                className='p-2 text-4xl peer-checked:text-blue-400'>
                  <BsList/>
              </label>

            </div>
            <div className='p-2'>
              <JumpToTimelineBtn timelineComp={timelineComp}/>
            </div>
            
        </div>
    </div>
  )
}

export default SelectView