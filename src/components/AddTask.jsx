import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState,useEffect } from 'react'
import taskManage from '../manage/taskmanager'
import TaskForm from './TaskForm'

const AddTask = ({loadedTasks, updateTask}) => {

  const [showAdd, setShowAdd] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [taskCategory, setTaskCategory] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDurartion, setTaskDuration] = useState(0);
  const [taskStatus, setTaskStatus] = useState("Ongoing")

  
  const displayAdd = () =>{
    if (showAdd) {
      setShowAdd(false)
    } else {
      setShowAdd(true)
    }
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
      status: taskStatus,

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
      {showAdd ? (
        <TaskForm
          displayAdd={displayAdd}
          handleSave={handleSave}
          setDeadline={setDeadline}
          setStartDate={setStartDate}
          setTaskCategory={setTaskCategory}
          setTaskTitle={setTaskTitle}
          setTaskDescription={setTaskDescription}
          setTaskDuration={setTaskDuration}
        />

    ) : 
    
    <div className='p-4'>
        <button
        onClick={displayAdd}
        className='flex overflow-hidden text-white font-bold bg-blue-500 p-2 rounded
        whitespace-nowrap transition ease-in-out delay-50 hover:bg-indigo-500'>
            <span className='inline-flex'>Add New Task</span>
            <span className='inline-flex text-xl mx-1'><BiAddToQueue/></span>
        </button>
    </div>
}
  </>
)
}

export default AddTask