import React from 'react'
import { useState, useEffect } from 'react'
import ArchivedList from './ArchivedList'
import Timeline from '../timeline/Timeline'
import EditForm from './EditForm'
import Search from '../Search'
import LargeList from './LargeList'
import CondensedList from './CondensedList'
import SelectView from './SelectView'
import taskManage from '../../manage/taskmanager'


const TaskList = ({
    loadedTasks, 
    updateTask, 
    searchPhrase, 
    isLargeList, 
    sortedArray, 
    updateArchived, 
    archived,
    workHours,
    capacity,
    ocpHours,
    isOptimized,
    setIsOptimized,
}) => {
    
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
                }
            }
            return task
        })
        return updatedTaskList
    }

    const handleEdit = (taskid) => {
        setSelectedTaskId(taskid)
        setShowForm(true)
        const task = loadedTasks.find(({ id }) => id === taskid);
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setTaskCategory(task.category);
        setStartDate(task.startdate);
        setDeadline(task.deadline);
        setTaskDuration(task.duration)
        //oldDetails(id)
    }

    const handleArch = (task, id) => {

        let allArch = [];
        if(archived){
            allArch = [...archived, task]
        } else {
            allArch= [task]
        }

        updateArchived(allArch);
        handleDelete(id);
        
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

    const view = () =>{
        switch(isLargeList){
            case 'Large':
                return(
                    <LargeList
                    loadedTasks={sortedArray}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                    handleEdit={handleEdit}
                    searchPhrase={searchPhrase}
                    handleArch={handleArch}
                />
                )
            case 'Condensed':
                return(
                    <CondensedList              
                    loadedTasks={sortedArray}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                    handleEdit={handleEdit}
                    searchPhrase={searchPhrase}
                    handleArch={handleArch}
                />
                )
                case 'Archived':
                    return(
                        <ArchivedList 
                        archived={archived}
                        />
                    )
                case 'Timeline':
                    return(
                        
                        <Timeline 
                          workHours={workHours} 
                          loadedTasks={loadedTasks} 
                          capacity={capacity}
                          ocpHours={ocpHours}
                          isOptimized = {isOptimized}
                          setIsOptimized = {setIsOptimized}
                        />
                    )
            }
        // case: "Large"{
        //     return(
        //         <LargeList
        //         loadedTasks={sortedArray}
        //         handleDelete={handleDelete}
        //         handleDone={handleDone}
        //         handleEdit={handleEdit}
        //         searchPhrase={searchPhrase}
        //         handleArch={handleArch}
        //     />
        //     )
        // }
        // else if(isLargeList === "Condensed"){
        //     return(
        //         <CondensedList              
        //         loadedTasks={sortedArray}
        //         handleDelete={handleDelete}
        //         handleDone={handleDone}
        //         handleEdit={handleEdit}
        //         searchPhrase={searchPhrase}
        //         handleArch={handleArch}
        //     />
        //     )
        // }
        // else if (isLargeList == "Archived"){
        //     return(
        //         <ArchivedList 
        //         archived={archived}
        //         />
        //     )

        // }
    }

  return (
    <>
        {showForm ? (
            <div>
            <EditForm
              displayForm={displayForm}
              handleSave={handleUpdateTaskList}
              setDeadline={setDeadline}
              setStartDate={setStartDate}
              setTaskCategory={setTaskCategory}
              setTaskTitle={setTaskTitle}
              setTaskDescription={setTaskDescription}
              setTaskDuration={setTaskDuration}
              taskTitle={taskTitle}
              taskDescription={taskDescription}
              taskCategory={taskCategory}
              startDate={startDate}
              deadline={deadline}
              taskDuration={taskDurartion}
            />
            </div>
        ) : 
        <div>
            {view()}
        </div>
        }
    </>
  )
}


const FilteredList = ({
    loadedTasks,
    updateTask, 
    updateArchived,
    archived,
    workHours,
    capacity,
    ocpHours,
    isOptimized,
    setIsOptimized,

    }) =>{
    const [sortedArray, setSortedArray] = useState([])
    const [searchPhrase, setSearchPhrase] = useState("")
    const [isLargeList, setIsLargeList] = useState("Large")
    
    useEffect(() => {
        setSortedArray(loadedTasks)
    }, [loadedTasks])
    

    const updateView = (state) =>{
        setIsLargeList(state)
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
                updateArchived={updateArchived}
                archived={archived}
                workHours={workHours} 
                capacity={capacity}
                ocpHours={ocpHours}
                isOptimized = {isOptimized}
                setIsOptimized = {setIsOptimized}
            />
        </div>
    </div>
    
    )
}


export default FilteredList