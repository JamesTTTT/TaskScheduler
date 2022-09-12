import React from 'react'
import { useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import Search from './Search'


const TaskList = ({loadedTasks, updateTask, searchPhrase}) => {
    
    const handleDelete = (id) => {
        console.log(id)
        const updatedTaskList = loadedTasks.filter((task) =>{
            return id !== task.id
        })
        updateTask(updatedTaskList)
    }

    const Tasks = () => {
        if (loadedTasks) {
            return loadedTasks
            .filter(item => {
                if (searchPhrase === ''){
                    return item
            } else if(item.title.toLowerCase().includes(searchPhrase.toLowerCase())) {
                    return item
            }
        })
            .map((item, index) => {
                return(
                    <div 
                    key={index}
                    className=" transition-colors rounded-xl p-4 bg-slate-300 mx-4 w-72
                    hover:bg-slate-400 flex flex-col justify-between my-3"
                    >   
                        <div>
                            <p className='text-xl'>{item.title}</p>
                            <p>{item.description}</p>
                            <p>Start: {item.startdate}</p>
                            <p>Deadline: {item.deadline}</p>
                            <p>Duration: {item.duration} hours</p>
                        </div>

                        <div className='pt-3 flex justify-end'>
                            <button
                            //onClick={()=>handleDelete(item.id)}
                            className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                            hover:bg-blue-700 transition-colors mx-1'>
                                <AiOutlineEdit/>
                            </button>
                            
                            <button
                            onClick={()=>handleDelete(item.id)}
                            className='text-2xl p-2 bg-slate-700 rounded-3xl text-white
                            hover:bg-red-700 transition-colors mx-1'>
                                <AiOutlineDelete/>
                            </button>

                        </div>

                    </div>
                )
            })
        }
    }


  return (
    <div>
        <div className='flex flex-row justify-center flex-wrap'>
            {Tasks()}
        </div>
    </div>
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