import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'

const EditForm = ({ 
        displayForm,
        handleSave, 
        setDeadline, 
        setStartDate, 
        setTaskCategory, 
        setTaskTitle, 
        setTaskDescription, 
        setTaskDuration,
        taskTitle,
        taskDescription,
        taskCategory,
        startDate,
        deadline,
        taskDuration

}) => {

  return (
    <div className='flex justify-center p-5'>
        <form
            id='editTask'
            onSubmit={handleSave}
            className="bg-slate-200 flex flex-col w-80 items-center rounded-md p-4 shadow-xl"
        >
        <div className='flex flex-row-reverse justify-between w-full'>
          <button
            onClick={displayForm} 
            className='m-1 text-sm p-2 font-bold bg-red-500 text-white rounded-full
            hover:bg-red-600'
            >
            <AiOutlineClose/>
          </button>
          <h1 className='text-lg p-1 font-bold'>Edit Task</h1>
        </div>

        <div>
            <label>Edit Title</label>
            <input
             type="text"
             name="title"
             maxLength="10"
             placeholder="Max 10 Characters"
             value={taskTitle}
             onChange={(e)=>{
              
              setTaskTitle(e.target.value)
             }}
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72'
             required
             />
            </div>

            <div>
            <label>Edit Description</label>
            <textarea
             type="text"
             name="description"
             placeholder="Max 100 Characters"
             maxLength="100"
             rows="4"
             value={taskDescription}
             className='bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg block p-2.5 w-72 max-h-24 min-h-24'
             onChange={(e)=>{
              setTaskDescription(e.target.value)
             }}
             required
             />
            </div>

            <div>
            <label>Edit category</label>
            <select 
            className='bg-gray-50 border border-gray-300 text-gray-900
            text-sm rounded-lg block p-2.5 w-72' 
            name="category"
            id="category"
            value={taskCategory}
            onChange={(e)=>{
              // console.log(e.target.value)
               setTaskCategory(e.target.value)
            }}
            >
              <option value="Hard">Hard</option>
              <option value="Challenging">Challenging</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Simple">Simple</option>
            </select>
            </div>
            <div>
            <label>Edit startdate</label>
            <input 
              type = "date"
              id = "startdate"
              name="startdate"
              value={startDate}
              required
              onChange={(date) => {
                setStartDate(date.target.value)
              }}
              className='bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72' 
              ></input>
            </div>

            <div>
            <label>Edit deadline</label>
            <input 
              type = "date"
              id = "deadline"
              name="deadline"
              min={startDate}
              value={deadline}
              required
              onChange={(date) => {
                setDeadline(date.target.value)
              }}
              className='bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72' 
              ></input>
            </div>
            <div>
              
              <label>Edit duration</label>
              <input 
                type = "number"
                id = "duration"
                name="duration"
                min="1"
                value={taskDuration}
                placeholder='Set number of hours' 
                onChange={(e)=>{
                  setTaskDuration(e.target.value)
                }}
                className='bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg block p-2.5 w-72' 
                ></input>
              </div>
  
              <div className='mt-4 text-center'>
  
                {/* {isDisabled
                  ?<div className='text-sm font-bold text-red-600 rounded-lg mb-3'>
                    <p>Warning:</p> 
                    <p>The there is not enough time to schedule this task between these dates</p>
                    <p>Soonest Deadline: {expectedFin}</p>
                  </div>
  
                  :<div></div>
                } */}
              
              <button
              type='submit'
              form='editTask'
              //disabled={isDisabled}
              className='p-2 bg-blue-500 text-white rounded
              transition ease-in-out delay-50 hover:bg-blue-600 w-32'>
                Save Task
              </button>
              </div>
        </form>
    </div>
  )
}

export default EditForm