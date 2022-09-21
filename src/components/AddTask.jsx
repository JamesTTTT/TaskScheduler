import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState,useEffect } from 'react'
import taskManage from '../manage/taskmanager'
import TaskForm from './TaskForm'

const AddTask = ({loadedTasks, updateTask}) => {

  const [showForm, setShowForm] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("Simple");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDurartion, setTaskDuration] = useState(0);
  const [taskStatus, setTaskStatus] = useState("In-Progress")

  
  const displayForm = () =>{
    if (showForm) {
      setShowForm(false)
    } else {
      setShowForm(true)
    }
  }

  const setDefValues = () =>{
    setTaskTitle("");
    setTaskDescription("");
    setTaskCategory("Simple");
    setStartDate(0);
    setDeadline(0);
    setTaskDuration(0);
    setTaskStatus("In-Progress")
    console.log(taskTitle)
  }

  const handleSave = (e) =>{

    e.preventDefault();
    let newTask = {
      id: new Date().getTime(),
      title: taskTitle,
      description: taskDescription,
      category: taskCategory,
      startdate: startDate,
      deadline: deadline,
      duration: taskDurartion,
      status: taskStatus,

    }
    setDefValues()

    let allTasks = [];

    if (loadedTasks) {
      allTasks = [...loadedTasks, newTask]
    }
    else {
      allTasks = [newTask]
    }
    
    updateTask(allTasks)
    //taskManage.saveTasks(allTasks)
    setShowForm(false)
  }
  
  return (
      <>
      {showForm ? (
        <TaskForm
          displayForm={displayForm}
          handleSave={handleSave}
          setDeadline={setDeadline}
          setStartDate={setStartDate}
          setTaskCategory={setTaskCategory}
          setTaskTitle={setTaskTitle}
          setTaskDescription={setTaskDescription}
          setTaskDuration={setTaskDuration}
          startdate={startDate}
        />

    ) : 
    
    <div className='p-4'>
        <button
        onClick={displayForm}
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