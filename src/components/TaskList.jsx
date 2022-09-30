import React from 'react'
import { useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheck} from 'react-icons/ai'
import {BiArchiveIn} from 'react-icons/bi'
import colorManage from '../manage/colormanager'
import timeline from '../manage/timeline'
import TaskForm from './TaskForm'
import Search from './Search'


const TaskList = ({loadedTasks, updateTask, searchPhrase}) => {
    
    const [showForm, setShowForm] = useState(false)

    const [deadline, setDeadline] = useState(0);
    const [startDate, setStartDate] = useState(0);
    const [taskCategory, setTaskCategory] = useState("Simple");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDurartion, setTaskDuration] = useState(0);

    const [selectedTaskID, setSelectedTaskId] = useState(0)

    const [editedTaskDetails, setEditedTaskDetails] = useState({})

    const displayForm = () =>{
        if (showForm) {
          setShowForm(false)
        } else {
          setShowForm(true)
        }
      }

    const handleDelete = (id) => {
        //console.log(id)
        const updatedTaskList = loadedTasks.filter((task) =>{
            return id !== task.id
        })
        updateTask(updatedTaskList)
    }

    const daysLeft = (deadline) =>{
        let today = new Date()
        let daysLeft = timeline.taskLenght(today,deadline)
        return daysLeft;
    }

    const archiveBtn = (status) =>{
        let comp = true;
        if (status === "Complete"){
            comp = false;
        }
        return comp
    }

    const newDetails = (id) => {
        let updatedTaskList = loadedTasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    title: taskTitle,
                    description: taskDescription,
                    category: taskCategory,
                    startdate: startDate,
                    deadline: deadline,
                    duration: taskDurartion,
                    status: "edited",
                }
            }
            return task
        })
        return updatedTaskList
    }

    const handleEdit = (id) => {
        setShowForm(true)
        setSelectedTaskId(id)
        //oldDetails(id)
    }

    const handleUpdateTaskList = () =>{
        let updatedTaskList = newDetails(selectedTaskID)
        
        updateTask(updatedTaskList)
    }

    const handleDone = (id) => {
        let updatedTaskList = loadedTasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    status: "Complete",
                }
            }
            return task
        })
        updateTask(updatedTaskList)
    }

    const tasks = () => {
        if (loadedTasks) {
            return loadedTasks
            .filter(item => {
                if (searchPhrase === ''){
                    return item
            } else if(item.title.toLowerCase().includes(searchPhrase.toLowerCase())) {
                    return item
            }
                return
            }).map((item, index) => {
                return(
                    <div 
                    key={index}
                    className=" transition-colors rounded-xl pb-4 bg-white mx-4 w-72
                    hover:bg-slate-200 flex flex-col justify-between my-3 shadow-xl"
                    >   
                        <div 
                            className=' rounded-t-xl p-2 text-white flex flew-row justify-between'
                            style={{backgroundColor: colorManage.statusColor(item.status)}}
                        >
                            <p className='text-xl font-light'>{item.title} </p>
                            <p className='text-sm font-light'>{item.status}</p>
                        </div>
                        <div className='px-4 pt-1'>
                            <p className='text-lg font-semibold'>Due: {item.deadline}</p>
                            <p className='text-sm font-semibold'>Started: {item.startdate}</p>
                            <p className='text-sm font-semibold'>Deadline in: {daysLeft(item.deadline)} days</p>
                            <p className='text-sm font-semibold'>{item.duration} hours
                                <span 
                                    className='px-2 rounded-xl mx-1'
                                    style={{backgroundColor: colorManage.difficultyColor(item.category)}}>
                                    {item.category}
                                </span>
                            </p>
                            <div 
                                className='h-20 break-words max-h-20 text-sm overflow-hidden mt-2 px-1'
                            >
                                <p>{item.description}</p>
                            </div>
                            
                            

                        </div>
                        {/* container for buttons */}
                        <div className='pt-3 flex flex-row-reverse justify-between items-start'>
                            <div className='px-2'>
                                {archiveBtn(item.status)
                                ?   <button
                                      onClick={()=>handleDone(item.id)}
                                      className='text-2xl p-2 bg-green-500 rounded-3xl text-white
                                      hover:bg-slate-700 transition-colors mx-1'>
                                          <AiOutlineCheck/>
                                    </button>
                                :   <button
                                    onClick={()=>handleDone(item.id)}
                                    className='text-2xl p-2 bg-slate-500 rounded-3xl text-white
                                    hover:bg-slate-700 transition-colors mx-1'>
                                        <BiArchiveIn/>
                                    </button>
                                }

                            </div>
                            <div className='flex justify-end px-2'>
                                <button
                                onClick={()=>handleEdit(item.id)}
                                className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                                hover:bg-blue-500 transition-colors mx-1'>
                                    <AiOutlineEdit/>
                                </button>

                                <button
                                onClick={()=>handleDelete(item.id)}
                                className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                                hover:bg-red-500 transition-colors mx-1'>
                                    <AiOutlineDelete/>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        // else {
        //     return( <div>
        //                 <p>
        //                     No Current Tasks
        //                 </p>
        //             </div>)
        // }
    }


  return (
    <>
        {showForm ? (
            <div>
            <TaskForm
              displayForm={displayForm}
              handleSave={handleUpdateTaskList}
              setDeadline={setDeadline}
              setStartDate={setStartDate}
              setTaskCategory={setTaskCategory}
              setTaskTitle={setTaskTitle}
              setTaskDescription={setTaskDescription}
              setTaskDuration={setTaskDuration}
              //title={editedTaskDetails.title}
              startdate={editedTaskDetails.startdate}
            />
            </div>
        ) : 
        <div className='flex flex-row justify-start flex-wrap'>
            {tasks()}
        </div>
        }
    </>
  )
}


const FilteredList = ({loadedTasks, updateTask}) =>{
    const [searchPhrase, setSearchPhrase] = useState("")
    return(
    <div>
        <div>
            <h1 className='text-3xl font-thin text-center'>All Tasks</h1>
        </div>
        <div>
            <Search
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
        </div>
        <div>
            <TaskList
                loadedTasks={loadedTasks}
                updateTask={updateTask}
                searchPhrase={searchPhrase}
            />
        </div>
    </div>
    
    )
}


export default FilteredList