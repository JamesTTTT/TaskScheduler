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
              <label className='p-2 text-xl'>
                <FaBoxes/>
              </label>
              <input
                type="radio" 
                name="select"
                onChange={()=>{updateView(true)}}
              />

            </div>
            <div className='px-1 flex flex-row bg-slate-700 rounded-r-xl'> 

              <input
                type="radio" 
                name="select" 
                onChange={()=>{updateView(false)}}/>
              <label for="select" className='p-2 text-3xl'>
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