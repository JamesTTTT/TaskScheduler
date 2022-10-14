import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment/moment'
import TaskForm from '../TaskForm'
import Search from '../Search'
import LargeList from './LargeList'
import CondensedList from './CondensedList'
import SelectView from './SelectView'
import taskManage from '../../manage/taskmanager'


const TaskList = ({loadedTasks, updateTask, searchPhrase, isLargeList, sortedArray}) => {
    
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
            {isLargeList
            ?(            
            <LargeList
                loadedTasks={sortedArray}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                searchPhrase={searchPhrase}
            />)
            :
            <CondensedList              
                loadedTasks={sortedArray}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                searchPhrase={searchPhrase}
            />

            }


        </div>
        }
    </>
  )
}


const FilteredList = ({loadedTasks, updateTask}) =>{
    const [sortedArray, setSortedArray] = useState([])
    const [searchPhrase, setSearchPhrase] = useState("")
    const [isLargeList, setIsLargeList] = useState(true)
    
    useEffect(() => {
        setSortedArray(loadedTasks)
    }, [loadedTasks])
    

    const updateView = (bool) =>{
        setIsLargeList(bool)
    }

    const handleSort = (arg) =>{
        let data = taskManage.sortTasks(arg, loadedTasks)
        setSortedArray(data)
    }

    return(
    <div>
        <div>
            <Search
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
        </div>
        <div>
            <SelectView
                updateView={updateView}
                handleSort={handleSort}
            />
        </div>
        <div>
            <TaskList
                loadedTasks={loadedTasks}
                updateTask={updateTask}
                searchPhrase={searchPhrase}
                isLargeList={isLargeList}
                sortedArray={sortedArray}
            />
        </div>
    </div>
    
    )
}


export default FilteredList