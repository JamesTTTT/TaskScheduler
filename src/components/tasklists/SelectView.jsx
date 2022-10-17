import React from 'react'
import {BsList} from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'
import {BiArchiveIn} from 'react-icons/bi'
import JumpToTimelineBtn from '../timeline/JumpToTimelineBtn';

const SelectView = ({updateView, timelineComp, handleSort}) => {
  return (
    <div>
        <div 
          className='text-lg p-1 flex justify-between bg-slate-200 rounded-xl font-light text-white'
          >
            <div className='p-2'>
              <JumpToTimelineBtn timelineComp={timelineComp}/>
            </div>
            <div className='flex justify-center'>
            <div className='p-1 flex flex-row bg-slate-700 rounded-l-xl'>
              <input
                type="radio" 
                name="select"
                className='peer hidden'
                id="select-radio-1"
                onChange={()=>{updateView("Large")}}
              />
              <label
                for="select-radio-1"
                className='p-2.5 text-2xl peer-checked:text-blue-400'>
                <FaBoxes/>
              </label>
            </div>
            <div className='px-1 flex flex-row bg-slate-700'> 
              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-2"
                onChange={()=>{updateView("Condensed")}}/>
              <label 
                for="select-radio-2"
                className='p-2 text-4xl peer-checked:text-blue-400'>
                  <BsList/>
              </label>
            </div>
            <div className='px-1 flex flex-row bg-slate-700 rounded-r-xl'> 
              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-3"
                onChange={()=>{updateView("Archived")}}/>
              <label 
                for="select-radio-3"
                className='p-3 text-3xl peer-checked:text-blue-400'>
                  <BiArchiveIn/>
              </label>
            </div>
            </div>
            <div className='text-black'>
                <select
                  onChange={(e)=>{ handleSort(e.target.value)}}
                  className='bg-gray-50 border border-gray-300 text-gray-900
                  text-sm rounded-lg block p-2.5 mt-1 mr-2' >
                  <option value="default">Unsorted</option>
                  <option value="title">Title</option>
                  <option value="duration">Duration</option>
                  <option value="deadline">Deadline</option>
                  <option value="startdate">Started</option>
                </select>
            </div>
            
        </div>
    </div>
  )
}

export default SelectView