import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
const AddTask = () => {
  return (
    <div>
        <div className='p-4'>
            <button 
            className='flex overflow-hidden text-white font-bold bg-blue-500 p-2 rounded
            whitespace-nowrap transition ease-in-out delay-50 hover:bg-indigo-500'>
                <span className='inline-flex'>Add New Task</span>
                <span className='inline-flex text-xl mx-1'><BiAddToQueue/></span>
            </button>
        </div>
        <div>
          <form>
            <label>Enter Task Title</label>
            <input
             type="text"
             name="title"
             placeholder="Task Title"
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72'
             required
             />
            <label>Enter Task Title</label>
            <textarea
             type="text"
             name="description"
             placeholder="Task Description"
             rows="4"
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72'
             required
             />
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
            <submit/>
          </form>
        </div>

    </div>
  )
}

export default AddTask