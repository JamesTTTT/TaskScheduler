import React from 'react'
import {BiAddToQueue}from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState,useEffect } from 'react'
import timeline from '../manage/timeline'
import capacityManage from '../manage/capacitymanager'
import TaskForm from './TaskForm'
import moment from 'moment/moment'

const AddTask = ({loadedTasks, updateTask, capacity,ocpHours, workHours}) => {

  const [showForm, setShowForm] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("Simple");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDurartion, setTaskDuration] = useState(0);
  const [taskStatus, setTaskStatus] = useState("In-Progress");
  const [isDisabled, setIsDisabled] = useState(false);
  const [expectedFin, setExpectedFin] = useState(0)

  useEffect(() => {
    //console.log(capacity)
    if(showForm){
      let newTask = {
        id: new Date().getTime(),
        title: "proto",
        description: "",
        category: "",
        startdate: startDate,
        deadline: deadline,
        duration: taskDurartion,
        status: "",
  
      }
      if(startDate && deadline && taskDurartion){
        let d = false;
        let proto = capacityManage.createProto(loadedTasks, capacity, newTask, workHours);
        if(proto){
          d = capacityManage.algCheckPossible(proto,deadline);
        }
        let e = proto.occupy.at(-1)
        console.log(e.day)
        let finalDate = moment().dayOfYear(e.day+1);

        finalDate = finalDate.format("YYYY-MM-DD");
        //finalDate = finalDate.toDate(finalDate);
        setExpectedFin(finalDate.toString())
        setIsDisabled(d)
      }

    }

  }, [taskDurartion,startDate,deadline,capacity])
    
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
    setIsDisabled(false)
    setExpectedFin(0)
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
    setShowForm(false)
  }
  
  return (
      <>
      {showForm ? (
        <div>
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
          isDisabled={isDisabled}
          expectedFin={expectedFin}
        />
        </div>

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