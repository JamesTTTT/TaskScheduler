import React from 'react'
import { useState } from 'react'
import timeline from '../../manage/timeline'
import TaskForm from '../TaskForm'
import Search from '../Search'
import LargeList from './LargeList'
import CondensedList from './CondensedList'


const TaskList = ({loadedTasks, updateTask, searchPhrase}) => {
    
    const [showForm, setShowForm] = useState(false)

    const [deadline, setDeadline] = useState(0);
    const [startDate, setStartDate] = useState(0);
    const [taskCategory, setTaskCategory] = useState("Simple");
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

    const daysLeft = (deadline) =>{
        let today = new Date()
        let daysLeft = timeline.taskLenght(today,deadline)
        let stateString = "Deadline in " + daysLeft.toString() + " days";
        if(daysLeft < 0) {
            daysLeft = daysLeft * -1
            stateString = "Deadline was " + daysLeft.toString() + " days ago";
        }
        return stateString;
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
        <div>
            <LargeList
                loadedTasks={loadedTasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                searchPhrase={searchPhrase}
            />
            <CondensedList              
                loadedTasks={loadedTasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                searchPhrase={searchPhrase}
            />
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