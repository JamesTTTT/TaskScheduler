import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import taskManage from '../manage/taskmanager'

const TaskList = ({loadedTasks, updateTask}) => {
    
    const handleDelete = (id) => {
        console.log(id)
        const updatedTaskList = loadedTasks.filter((task) =>{
            return id !== task.id
        })
        updateTask(updatedTaskList)
    }

    const Tasks = () => {
        if (loadedTasks) {
            return loadedTasks.map((item, index) => {
                return(
                    <div 
                    key={index}
                    className="rounded p-4 bg-slate-300 mx-4 w-56
                    hover:bg-slate-400"
                    >   
                        <div>
                            <p className='text-xl'>{item.title}</p>
                            <p>{item.description}</p>
                            <p>Deadline {item.deadline}</p>
                        </div>

                        <div >
                            <button
                            onClick={()=>handleDelete(item.id)}
                            className='p-2 bg-slate-700 rounded-3xl text-white'>
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
        <div>
            <h1 className='text-3xl font-thin text-center'>All Tasks</h1>
        </div>
        <div className='flex flex-row justify-center'>
            {Tasks()}
        </div>
    </div>
  )
}

export default TaskList