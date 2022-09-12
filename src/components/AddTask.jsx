import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState,useEffect } from 'react'
import taskManage from '../manage/taskmanager'

const AddTask = ({loadedTasks, updateTask}) => {

  const [showAdd, setShowAdd] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [taskCategory, setTaskCategory] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDurartion, setTaskDuration] = useState(0);

  
  const displayAdd = () =>{
    if (showAdd) {
      setShowAdd(false)
    } else {
      setShowAdd(true)
    }
  }

  const dateTransform = (date) =>{
    return new Date(date.toISOString)
  }

  const handleSave = (e) =>{

    e.preventDefault();
    let newTask = {
      id: new Date().getTime(),
      title: taskTitle,
      description: taskDescription,
      category: taskCategory,
      startdate: startDate.toDateString(),
      deadline: deadline.toDateString(),
      duration: taskDurartion,

    }

    let allTasks = [];

    if (loadedTasks) {
      allTasks = [...loadedTasks, newTask]
    }
    else {
      allTasks = [newTask]
    }
    
    updateTask(allTasks)
    taskManage.saveTasks(allTasks)
    setShowAdd(false)
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
          <form
          id='newTask'
          onSubmit={handleSave}
          className='bg-slate-100 flex flex-col w-80 items-center rounded-md p-4'>
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
             onChange={(e)=>{
              setTaskTitle(e.target.value)
             }}
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
             onChange={(e)=>{
              setTaskDescription(e.target.value)
             }}
             required
             />
            </div>

            <div>
            <label>Select a category</label>
            <select 
            className='bg-gray-50 border border-gray-300 text-gray-900
            text-sm rounded-lg block p-2.5 w-72' 
            name="category"
            id="category"
            onChange={(e)=>{
               setTaskCategory(e.target.value)
            }}
            >
              <option value="Hard">Hard</option>
              <option value="Challeging">Challenging</option>
              <option value="Intermidate">Intermediate</option>
              <option value="Easy">Easy</option>
            </select>
            </div>

            <div>
            <label>Set startdate</label>
            <input 
              type = "datetime-local"
              id = "startdate"
              name="startdate"
              //selected={deadline} 
              onChange={(date) => {setStartDate(dateTransform(date.val()))}}
              className='bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72' 
              ></input>
            </div>

            <div>
            <label>Set deadline</label>
            <input 
              type = "datetime-local"
              id = "deadline"
              name="deadline"
              //selected={deadline} 
              onChange={(date) => {setDeadline(dateTransform(date.val()))}}
              className='bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72' 
              ></input>
            </div>

            <div>
            <label>Set duration</label>
            <input 
              type = "number"
              id = "duration"
              name="duration"
              placeholder='Set number of hours' 
              onChange={(e)=>{
                setTaskDuration(e.target.value)
              }}
              className='bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg block p-2.5 w-72' 
              ></input>
            </div>

            <div className='mt-4'>
            <button
            type='submit'
            form='newTask'
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