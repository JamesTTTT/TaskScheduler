import React from 'react'
import {BsList, BsCalendar3Range} from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'
import {BiArchiveIn, BiAddToQueue} from 'react-icons/bi'
import JumpToTimelineBtn from '../timeline/JumpToTimelineBtn';

const SelectView = ({updateView, displayForm, handleSort}) => {
  return (
    <div>
        <div 
          className='p-1 mb-4 flex justify-between align-baseline bg-slate-700 rounded-xl font-light text-white'>
              <div className='p-1'>
                  <button
                   onClick={displayForm}
                    className='overflow-hidden text-white bg-blue-500 p-2 rounded-md
                    whitespace-nowrap transition ease-in-out delay-50 hover:bg-blue-700
                    flex items-center text-center'>
                    <span className='inline-flex font-bold text-md'>Add Task</span>
                    <span className='inline-flex text-xl py-1 px-2'><BiAddToQueue/></span>
                  </button>
              {/* <JumpToTimelineBtn timelineComp={timelineComp}/> */}
            </div>

            <div className='flex justify-center'>
            <div>
              <input
                type="radio" 
                name="select"
                className='peer hidden'
                id="select-radio-1"
                onChange={()=>{updateView("Large")}}
              />
              <label
                for="select-radio-1"
                className='text-2xl h-full peer-checked:text-blue-400 p-2 items-center pl-4 justify-center flex flex-row bg-slate-700
                rounded-l-xl hover:bg-slate-600'>
                <FaBoxes/>
              </label>
            </div>

            <div> 
              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-2"
                onChange={()=>{updateView("Condensed")}}/>
              <label 
                for="select-radio-2"
                className='text-4xl peer-checked:text-blue-400
                h-full p-2 flex flex-row bg-slate-700 items-center 
                justify-center hover:bg-slate-600'>
                  <BsList/>
              </label>
            </div>

            <div> 
              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-3"
                onChange={()=>{updateView("Archived")}}/>
              <label 
                for="select-radio-3"
                className='text-3xl peer-checked:text-blue-400 p-2
                h-full flex flex-row bg-slate-700 items-center 
                justify-center hover:bg-slate-600'>
                  <BiArchiveIn/>
              </label>
            </div>

            <div> 
              <input
                type="radio" 
                name="select" 
                className='peer hidden'
                id="select-radio-4"
                onChange={()=>{updateView("Timeline")}}/>
              <label 
                for="select-radio-4"
                className='text-2xl peer-checked:text-blue-400 items-center
                h-full justify-center p-2 pr-5 pl-2
                flex flex-row bg-slate-700 rounded-r-xl
                hover:bg-slate-600'>
                  <BsCalendar3Range/>
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