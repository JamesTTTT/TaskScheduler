import React from 'react'
import {BsList} from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'

const SelectView = ({updateView}) => {
  return (
    <div>
        <div>
            <h1 className='text-3xl font-thin text-center'>All Tasks</h1>
        </div>
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
                className=''
                onChange={()=>{updateView(false)}}/>
                <label for="select" className='p-2 text-3xl'>
                    <BsList/>
                </label>
            </div>
        </div>
    </div>
  )
}

export default SelectView