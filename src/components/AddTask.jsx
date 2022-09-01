import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'

const AddTask = () => {

  const [showAdd, setShowAdd] = useState(false);

  const displayAdd = () =>{
    if (showAdd) {
      setShowAdd(false)
    } else {
      setShowAdd(true)
    }
  }
  
  return (
    <>
      <div className='p-4'>
          <button
          onClick={displayAdd}
          className='flex overflow-hidden text-white font-bold bg-blue-500 p-2 rounded
          whitespace-nowrap transition ease-in-out delay-50 hover:bg-indigo-500'>
              <span className='inline-flex'>Add New Task</span>
              <span className='inline-flex text-xl mx-1'><BiAddToQueue/></span>
          </button>
      </div>

    {showAdd ? (
        <div className='p-3'>
          <form className='bg-slate-100 flex flex-col w-80 items-center rounded-md p-4'>
            <button
              onClick={displayAdd} 
              className='m-1 p-1 bg-red-500 text-white rounded-xl'
              >
              <AiOutlineClose/>
            </button>
            <h1 className='text-l'>Create Task</h1>
            <div>
            <label>Enter Title</label>
            <input
             type="text"
             name="title"
             placeholder="Task Title"
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72'
             required
             />
            </div>

            <div>
            <label>Enter Description</label>
            <textarea
             type="text"
             name="description"
             placeholder="Task Description"
             rows="4"
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72'
             required
             />
            </div>

            <div>
            <label>Select a category</label>
            <select 
            className='bg-gray-50 border border-gray-300 text-gray-900
            text-sm rounded-lg block p-2.5 w-72' 
            name="category"
            id="category">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            </div>

            <div className='mt-4'>
            <button 
            className='p-2 bg-blue-500 text-white rounded
            transition ease-in-out delay-50 hover:bg-indigo-500 w-32'>
              Save Task
            </button>
            </div>
          </form>
        </div>
        ) : (" ")}
      </>
  )
}

export default AddTask