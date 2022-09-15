import React from 'react'
import { useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import TaskForm from './TaskForm'
import Search from './Search'


const TaskList = ({loadedTasks, updateTask, searchPhrase}) => {
    
    const [showForm, setShowForm] = useState(false)

    const [deadline, setDeadline] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [taskCategory, setTaskCategory] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDurartion, setTaskDuration] = useState(0);

    const [selectedTaskID, setSelectedTaskId] = useState(0)

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

    const newDetails = (id) => {
        let updatedTaskList = loadedTasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    title: taskTitle,
                    description: taskDescription,
                    category: taskCategory,
                    startdate: startDate.toDateString(),
                    deadline: deadline.toDateString(),
                    duration: taskDurartion,
                    status: "edited",
                }
            }
            return task
        })
        console.log(updatedTaskList)
        return updatedTaskList
    }

    const handleEdit = (id) => {
        //console.log(id)
        setShowForm(true)
        setSelectedTaskId(id)
    }

    const handleUpdateTaskList = () =>{
        let updatedTaskList = newDetails(selectedTaskID)
        
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
            }).map((item, index) => {
                return(
                    <div 
                    key={index}
                    className=" transition-colors rounded-xl pb-4 bg-white mx-4 w-72
                    hover:bg-slate-200 flex flex-col justify-between my-3 shadow-xl"
                    >   
                        <div className='bg-blue-700 rounded-t-xl p-2 text-white'>
                            <p className='text-xl'>{item.title}</p>
                        </div>
                        <div className='px-4 pt-1'>
                            <p>{item.description}</p>
                            <p>Start: {item.startdate}</p>
                            <p>Deadline: {item.deadline}</p>
                            <p>Duration: {item.duration} hours</p>
                            <p>Status: {item.status}</p>
                        </div>

                        <div className='pt-3 flex justify-end px-2'>
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
                )
            })
        }
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
            />
            </div>
        ) : 
        <div className='flex flex-row justify-center flex-wrap'>
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